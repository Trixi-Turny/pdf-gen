const pdfInvoice = require('pdf-invoice');
const document = pdfInvoice({
    company: {
      phone: '(99) 9 9999-9999',
      email: 'company@weswap.com',
      address: 'Av. Companhia, 182, Água Branca, Piauí',
      name: 'WeSwap',
    },
    customer: {
      name: 'Elliot Raque',
      email: 'raque@gmail.com',
    },
    items: [
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit ametLorem ipsum dollor sit amet', local_amount: 10, fx_rate: 34.5,  amount: 15 },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit amet', local_amount: 100, fx_rate: 34.5,  amount: 100 },
      {date:'2018-03-02', description: 'Lorem ipsum dollor sit amet', local_amount: 1873, fx_rate: 34.5,  amount: 1550 },
    ],
  });
 
const fs = require('fs');
document.generate(); // triggers rendering
document.pdfkitDoc.pipe(fs.createWriteStream('./testerr.pdf'));