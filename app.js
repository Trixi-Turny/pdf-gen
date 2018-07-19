const pdfInvoice = require('./index.js');
const document = pdfInvoice({
    company: {
    
      phone: '(99) 9 9999-9999',
      email: 'company@weswap.com',
      address: 'Av. Companhia, 182, Água Branca, Piauí',
      logo: 'assets/Png_logo_Large.png',
    },
    dateRange:{
      dateFrom: '2018-08-01',
      dateTo: '2018-08-31'
    },
    customer: {
      name: 'Elliot Raque',
      address:{
        addressLine1: '1 Street rd',
        addressLine2: 'Westminster',
        addressLine3: 'Town',
        postCode: 'SY45 7UJ',
        country: 'UK'
      }
    },
    items: [
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000900 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+150000.97 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+10 GBP' , fx_rate: 34.5876,  amount: '+15000 GHS' },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit ametLorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: '+1000000.90 GBP' , fx_rate: 34.5876,  amount: '+1500000 GHS' },
    ],
  });
 
const fs = require('fs');
document.generate(); // triggers rendering
document.pdfkitDoc.pipe(fs.createWriteStream('./testerr.pdf'));