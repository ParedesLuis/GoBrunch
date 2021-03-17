const path = require("path");

let array = [];
let actualPage = 0
let pages = 0
let optionSelected = ''
let quantitySelected = 0

module.exports = (server) => {
  server.get("/", (req, res) => {
    res.render(path.join(__dirname, "../public/index.ejs"), {
      array: [],
      option: '',
      quantity: 0,
      pages: 0,
      page: 0
    });
  });

  server.get("/build_array", (req, res) => {
    const { option, quantity } = req.query;
    if (option !== "" || quantity !== "") {
      let n = quantity;

      optionSelected = option
      quantitySelected = quantity

      array = []

      for (let i = 1; i <= n; i++) {
        array.push({ value: `${option}${i}`, index: i });
        page = 1;
        pages = Math.ceil(n / 3);
      }

      res.render(path.join(__dirname, "../public/index.ejs"), {
        array: [...array.slice(0,3)],
        option,
        quantity,
        pages,
        page: 0
      });
    }

    res.redirect('/')
  })

  server.get("/page", (req, res) => {
    if(array.length > 0){
      const { page } = req.query;

      let pageToShow = page ? parseInt(page) : 0 
      
      actualPage = pageToShow

      res.render(path.join(__dirname, "../public/index.ejs"), {
        array: [...array.slice(pageToShow * 3,(pageToShow*3) + 3)],
        pages,
        option: optionSelected,
        quantity: quantitySelected,
        page: actualPage
      });
    }

    res.redirect('/')
  })
};
