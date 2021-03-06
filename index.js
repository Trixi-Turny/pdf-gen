'use strict';

var PdfKit = require('pdfkit');
var moment = require('moment');
var numeral = require('numeral');
var i18n = require('./i18n');
const TEXT_SIZE = 9.5;
const HEADER_TEXT_SIZE = 18;
const TABLE_HEADER = 9.5;
const CONTENT_LEFT_PADDING = 30;
const CONTENT_WIDTH = 700;
const FOOTER_WIDTH = 540;
const TEXT_COLOUR = '#262626';
const FOOTER_COLOUR = '#707070';
const YELLOW_LINE_COLOUR = '#ffb300';
const GREY_LINE_COLOUR = '#cccccc';
const FOOTER = '©2018 WeSwap.com Limited. All Rights Reserved. WeSwap and the WeSwap logo are trade marks of WeSwap.com Limited. The WeSwap Prepaid Mastercard is issued by IDT Financial Services Ltd.  IDT Financial Services Limited is part of the IDT Corporation Group of International Companies headquartered in the US. Its cards are issued pursuant to license by Mastercard International. Mastercard and the Mastercard Brand Mark are registered trademarks of Mastercard International. IDT Financial Services Limited is a regulated bank, licensed by the Financial Services Commission (FSC), Gibraltar, under the Financial Services (Banking) Act 1992. Registered Office: 57-63 Line Wall Road, Gibraltar. Registered No: 95716. Directors: M. Fischer, J. Raanan, D. Spier, T. Streatfeild-James. '
const pleaseNote = 'Please note:';
const pleaseNoteNotice = pleaseNote + '  If you have received a refund during this month, the transaction may not appear here, please refer to your activity tab and use the export functionality to download all activities for this period or contact our Customer Service team at support@weswap.com';

function PDFInvoice(_ref){
    var customer = _ref.customer;
    var items = _ref.items;
    var dateRange = _ref.dateRange;

    // Set the logo
    var logo = __dirname+ '/assets/Png_logo_Large.png';

    //bufferPages for adding page numbers and ability to generate header and footer on the fly
    var doc = new PdfKit({ size: 'A4', margin: 50, bufferPages: true });
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
    function generateVerticalLine(lineBreaks){
        var textHeight = 16.5;
        var offset = (lineBreaks + 1) * textHeight;
        var lineHeight = 146
        doc.moveTo(40, lineHeight)
            .lineTo(40, lineHeight+offset)
            .lineWidth(1.2)
            .strokeColor(YELLOW_LINE_COLOUR)
            .stroke();

    }
    function genHeader() {
        //Logo
        doc.image(logo, CONTENT_LEFT_PADDING, 20, {
            fit: [156.75, 31.75],
            align: 'center',
            valign: 'center'
        });

        //Top -left text with 'Statement and date
        doc.font('WeSwap-semibold').fontSize(HEADER_TEXT_SIZE).fillColor(TEXT_COLOUR).text('Statement', CONTENT_LEFT_PADDING, 30, {
            align: 'right',
        });
        doc.font('WeSwap-semibold').fontSize(HEADER_TEXT_SIZE).text(moment(dateRange.dateFrom, 'YYYY-MM-DD').format('DD/MM/YYYY') + ' - ' + moment(dateRange.dateTo, 'YYYY-MM-DD').format('DD/MM/YYYY'), CONTENT_LEFT_PADDING, 70, {
            align: 'right',
        }).fillColor(TEXT_COLOUR);

        var address1 = customer.address.addressLine1 ? '\n' + customer.address.addressLine1 : '';
        var address2 = customer.address.addressLine2 ? '\n' + customer.address.addressLine2 : '';
        var address3 = customer.address.addressLine3 ? '\n' + customer.address.addressLine3 : '';
        var postCode = customer.address.postCode ? '\n' + customer.address.postCode : '';
        var country = customer.address.country ? '\n' + customer.address.country : '';

        var addressString = customer.name + address1 + address2 + address3 + postCode + country;  
        var lineBreaks = addressString.match(new RegExp('\n', 'g') || []).length;

        generateVerticalLine(lineBreaks);


        //Customer address:
        doc.font('WeSwap-semibold').fontSize(12).text(addressString, CONTENT_LEFT_PADDING + 20, 150, {
            align: 'left'
        }).fillColor(TEXT_COLOUR);


    }

    function generateNotice(){
        
        doc.font('WeSwap-semibold').fontSize(TEXT_SIZE).fillColor(TEXT_COLOUR)
        .text(pleaseNoteNotice.slice(0, pleaseNote.length), CONTENT_LEFT_PADDING, 700,{
        width: FOOTER_WIDTH,
        continued: true})
        .font('WeSwap-light').fontSize(TEXT_SIZE).fillColor(TEXT_COLOUR)
        .text(pleaseNoteNotice.slice(pleaseNote.length));

    }
    function genFooter() {
        doc.font('WeSwap-light').fontSize(6.6).fillColor(FOOTER_COLOUR).text(FOOTER, CONTENT_LEFT_PADDING, 750, {
            width: FOOTER_WIDTH
        });
    }

    function genTableHeaders() {
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

    //group page content per n items for aesthetics
    function generateTableContentForPage(){
        var group = [];

        //the number of rows to fit in a page comfortably
        var n = 9;
        for (var i = 0, j = 0; i < items.length; i++) {
            if (i >= n && i % n === 0) {
                j++;
                doc.addPage();
            }
            group[j] = group[j] || [];
            group[j].push(items[i]);

        }
        return group;
    }

    function generateTableForPage(chunk) {
        var lineHeight = 310;
        var wrap = 600;             
        var previousTwoLiner = false;

        chunk.forEach(function (item, itemIndex) {
            var twoLineDescription = false;
            var offset1 = 37;
            var offset2 = 23;
            var lineHeightOffset = 32;
            var safeLineBreak = 30;
            var maxLength = safeLineBreak * 2 ;
    
            console.log(item.description.length + ' '+ item.description);
            if (item.description.length > safeLineBreak) {
                item.description = item.description.substring(0, maxLength);

                //force add a space at char 'safeLengthBreak' to make sure lines wrap safely
                //needed when description comes through without spaces
                item.description = [item.description.slice(0, safeLineBreak), '\n', item.description.slice(safeLineBreak)].join('');
                twoLineDescription = true;
            }
    
            if(twoLineDescription && previousTwoLiner){
                offset2 = 23;
                previousTwoLiner = true;
                lineHeightOffset = 31;
    
            }else if(twoLineDescription && !previousTwoLiner){
                previousTwoLiner = true;
                offset2 = 17;
                lineHeightOffset = 32;
    
            }else if(!twoLineDescription && previousTwoLiner){
                previousTwoLiner = false;
                offset2 = 23;
                lineHeightOffset = 22;
    
            }else{
                offset2 = 23;
                previousTwoLiner = false;
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
        genContentForEachPage: function genContentForEachPage() {
            var tableContent = generateTableContentForPage();
            var range = doc.bufferedPageRange();
            var pageNoHeight = 720;
            for (var k = 0; k < range.count; k++) {
                doc.switchToPage(k);
                if(k==range.count -1){
                    generateNotice();
                    pageNoHeight = 670;
                }

                doc.font('WeSwap-semibold').fontSize(10).text('Page ' + (k + 1) + ' of ' + range.count, CONTENT_LEFT_PADDING, pageNoHeight, {
                    align: 'right',
                }).fillColor(TEXT_COLOUR); 
                genHeader();
                genFooter();
                genTableHeaders();
                genYellowLine();
                generateTableForPage(tableContent[k]);
               
            }
            
        },
        generate: function generate() {
            this.genContentForEachPage();
            doc.end();
        },

        get pdfkitDoc() {
            return doc;
        }
    };   
}

PDFInvoice.lang = 'pt_BR';

module.exports = PDFInvoice;