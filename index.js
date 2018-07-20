'use strict';

var pdfKit = require('pdfkit');
var moment = require('moment');
var numeral = require('numeral');
var i18n = require('./i18n');
const TEXT_SIZE = 9.5;
const TABLE_HEADER = 9.5;
const CONTENT_LEFT_PADDING = 30;
const CONTENT_WIDTH = 700;
const FOOTER_WIDTH = 540;
const TEXT_COLOUR = '#262626';
const FOOTER_COLOUR = '#707070';
const YELLOW_LINE_COLOUR = '#ffb300';
const GREY_LINE_COLOUR = '#cccccc';
const FOOTER = '©2018 WeSwap.com Limited. All Rights Reserved. WeSwap and the WeSwap logo are trade marks of WeSwap.com Limited. The WeSwap Prepaid Mastercard is issued by IDT Financial Services Ltd.  IDT Financial Services Limited is part of the IDT Corporation Group of International Companies headquartered in the US. Its cards are issued pursuant to license by Mastercard International. Mastercard and the Mastercard Brand Mark are registered trademarks of Mastercard International. IDT Financial Services Limited is a regulated bank, licensed by the Financial Services Commission (FSC), Gibraltar, under the Financial Services (Banking) Act 1992. Registered Office: 57-63 Line Wall Road, Gibraltar. Registered No: 95716. Directors: M. Fischer, J. Raanan, D. Spier, T. Streatfeild-James. '
  
function PDFInvoice(_ref){
  var customer = _ref.customer;
          var items = _ref.items;
          var dateRange = _ref.dateRange;
      
          // Set the logo
          var logo = __dirname+ '/assets/Png_logo_Large.png';
      
          //bufferPages for adding page numbers and ability to generate header and footer on the fly
          var doc = new pdfKit({ size: 'A4', margin: 50, bufferPages: true });
          doc.registerFont('WeSwap-semibold', __dirname +'/assets/montserrat-semibold.ttf');
          doc.registerFont('WeSwap-light', __dirname +'/assets/montserrat-light.ttf');
      
    
      
      //    moment.locale(PDFGenerator.lang);
      
          var divMaxWidth = 570;
          var table = {
              x: CONTENT_LEFT_PADDING,
              y: 300,
              //distance of fields in table from left after CONTENT_LEFT_PADDING
              inc: [0, 70, 280, 390, 465]
          };

          //vertical line next to address
          function generateVerticalLine(lineHeight){
            doc.moveTo(40, 245)
            .lineTo(40, lineHeight)
            .lineWidth(1.2)
            .strokeColor(YELLOW_LINE_COLOUR)
            .stroke();

          }
          function genHeader() {
              console.log('generating header');
      
              //Logo
              doc.image(logo, CONTENT_LEFT_PADDING, 20, {
                  fit: [156.75, 31.75],
                  align: 'center',
                  valign: 'center'
              });

              generateVerticalLine(150);


              //Top -left text with 'Statement and date
              doc.font('WeSwap-semibold').fontSize(18).fillColor(TEXT_COLOUR).text('Statement', CONTENT_LEFT_PADDING, 30, {
                  align: 'right',
              })
              doc.font('WeSwap-semibold').fontSize(18).text(moment(dateRange.dateFrom, 'YYYY-MM-DD').format('L') + ' - ' + moment(dateRange.dateTo, 'YYYY-MM-DD').format('L'), CONTENT_LEFT_PADDING, 70, {
                  align: 'right',
              }).fillColor(TEXT_COLOUR);
      
              //Customer address:
              doc.font('WeSwap-semibold').fontSize(12).text(customer.name + '\n' + customer.address.addressLine1 + '\n' + customer.address.addressLine2 + '\n' + customer.address.addressLine3 + '\n' + customer.address.postCode + '\n' + customer.address.country, CONTENT_LEFT_PADDING + 20, 150, {
                  align: 'left'
              }).fillColor(TEXT_COLOUR);
      
      
          }
      
          function genFooter() {
              doc.font('WeSwap-light').fontSize(6.6).fillColor(FOOTER_COLOUR).text(FOOTER, CONTENT_LEFT_PADDING, 740, {
                  width: FOOTER_WIDTH
              })
              console.log('footer is done');
          }
      
          function genTableHeaders() {
              console.log('generating table header');
              var secondRow = ['', '', '(if applicable)', '(if applicable)', ''];
              ['Date', 'Description', 'Local amount', 'FX Rate', 'Amount'].forEach(function (text, i) {
      
                  doc.font('WeSwap-semibold').fontSize(TABLE_HEADER).fillColor(TEXT_COLOUR).text(text.substring(), table.x + table.inc[i], 275);
      
              });
      
              //for 'if applicable' bit
              secondRow.forEach(function (str, i) {
                  doc.font('WeSwap-light').fontSize(7).text(str, table.x + table.inc[i], 290);
              });
          }
      
          //for yellow line under tableheaders:
          function genYellowLine() {
              console.log('Generating Yellow Line');
              var maxWidth = CONTENT_WIDTH;
              var verticalPosition = 310;
              doc.moveTo(maxWidth, verticalPosition)
                  .lineTo(0, verticalPosition)
                  .lineWidth(1.2)
                  .strokeColor(YELLOW_LINE_COLOUR)
                  .stroke();
          }
      
      
      
          function genTableLines(lineHeight) {
              doc.moveTo(divMaxWidth, lineHeight)
                  .lineTo(CONTENT_LEFT_PADDING, lineHeight)
                  .lineWidth(0.01)
                  .strokeColor(GREY_LINE_COLOUR)
                  .strokeOpacity(0.45)
                  .stroke();
      
          }
      
          function generateTableForPage(chunk) {
              var lineHeight = 310;
              var wrap = 600;
             
              var previousTwoLiner = false;

              
              chunk.forEach(function (item, itemIndex) {
                var twoLineDescription = false;
                var offset1 = 35;
                var offset2 = 20;
                var lineHeightOffset = 32;
   
                if (item.description.length > 35) {
                    item.description = item.description.substring(0, 69);
                    twoLineDescription = true;
                    wrap = 210;
                }

                if(twoLineDescription && previousTwoLiner){
                    console.log(itemIndex+ " 2liner "+ twoLineDescription+ " prev2 "+ previousTwoLiner);
                  offset2 = 23;
                  previousTwoLiner = true;
                  lineHeightOffset = 31;
    
                }else if(twoLineDescription && !previousTwoLiner){
                    console.log(itemIndex+ " 2liner "+ twoLineDescription+ " prev2 "+ previousTwoLiner);
                    previousTwoLiner = true;
                    offset2 = 17;
                    lineHeightOffset = 32;
  
                }else if(!twoLineDescription && previousTwoLiner){
                    console.log(itemIndex+ " 2liner "+ twoLineDescription+ " prev2 "+ previousTwoLiner);
                    previousTwoLiner = false;
                    twoLineDescription= false;
                    offset2 = 26;
                    lineHeightOffset = 22;
    
                }else {
    
                    offset2 = 20;
                    previousTwoLiner = false;
                    twoLineDescription= false;
                    lineHeightOffset = 24;

                }
        
                  ['date', 'description', 'local_amount', 'fx_rate', 'amount'].forEach(function (field, i) {
      

                
                      doc.font('WeSwap-light').fontSize(TEXT_SIZE).text(item[field], table.x + table.inc[i], table.y + offset2 + itemIndex * offset1, {
                        width: wrap,
                      });
    
                  });
    
                  lineHeight = table.y + offset2 + itemIndex * offset1 + lineHeightOffset;
                  genTableLines(lineHeight);
      
      
              });
      
          }
          return {
              genTableRow: function genTableRow() {
                  console.log('generating table row');
      
              },
      
      
              genContentForEachPage: function genContentForEachPage() {
      
                  //group items per n rows
                  var group = [];
      
                  //the number of rows to fit in a page comfortably
                  var n = 10;
                  for (var i = 0, j = 0; i < items.length; i++) {
                      if (i >= n && i % n === 0) {
                          j++;
                          doc.addPage();
                      }
                      group[j] = group[j] || [];
                      group[j].push(items[i]);
      
                  }
      
                  var range = doc.bufferedPageRange();
                  for (var i = 0; i < range.count; i++) {
                      doc.switchToPage(i);
                      doc.font('WeSwap-semibold').fontSize(10).text('Page ' + (i + 1) + ' of ' + range.count, CONTENT_LEFT_PADDING, CONTENT_WIDTH, {
                          align: 'right',
                      }).fillColor(TEXT_COLOUR);
      
                      genHeader();
                      genFooter();
                      genTableHeaders();
                      genYellowLine();
                      generateTableForPage(group[i]);
      
                  }
          
              },
              generate: function generate() {
                  console.log('Start generating');
                  this.genContentForEachPage();
                  console.log('Ending');
                  doc.end();
              },
      
              get pdfkitDoc() {
                  return doc;
              }
          };
      }    



PDFInvoice.lang = 'pt_BR';

module.exports = PDFInvoice;