[![Build Status](https://travis-ci.com/GBouffard/pop-in-a-box-eCommerce.svg?branch=master)](https://travis-ci.com/GBouffard/pop-in-a-box-eCommerce)

# :dolls: Pop in a box eCommerce shop :dolls:

simple e-commerce shop with JavaScript and JQuery:

## Technologies used

- Javascript
- JQuery
- Jasmine
- Chai
- HTML
- Sass
- Node
- Express
- Open

## How to run it

```
git clone git@github.com:GBouffard/pop-in-a-box-eCommerce.git
cd pop-in-a-box-eCommerce
./build.sh
```

The sheel script automatically:

- install packages
- run the unit tests
- start the server
- open the app
  nb: the page automatically opens with `google chrome`; if you would rather have firefox for example, just change `google chrome` on line 16 of `server.js` to `firefox`.

## Screenshot

![](assets/images/screenshot.png)

## Additional tests

Jasmine's tests are passing but Jasmine's SpecRunner seems to not work like it used to.
The only visual available is the dotted one:

![](assets/images/jasmine-tests.png)

In order to get a better visual representation I also wrote the tests using a combination of Chai and Mocha.
It runs with:
```
npm run chai-test
```
and here is the test report:

![](assets/images/chai-tests.png)
