# Email Template Maker 

#### Project road : 

- [x] Create Repo
- [x] Add Inline Style
- [x] Add Gmail SMTP Test
- [x] Create Documentation
- [x] Create an Example
- [x] Finish Build
- [x] Finish [Auto host images](https://github.com/webcaetano/gulp-image-autohost) on imgur
- [ ] Make Yeoman Generator based on this project for SASS / Less switch

### Requirements

- [NodeJS](https://nodejs.org)
- [GulpJS](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
- ~~Litmu$~~

![Free!](http://i.imgur.com/u25kDb5.jpg)

### Instalation

```
git clone https://github.com/webcaetano/email-maker.git
cd email-maker
npm i
bower install
```

### Commands 

Start development mode
```
gulp serve
```


Send a email test for your inbox.
```
gulp test
```


Build and send a email test for your inbox.
```
gulp test:dist
```

Create html file of your template 
```
gulp build
// or
gulp 
```

### Structure 

```
/email-maker
|
|.gmail-credentials # <--- Add your gmail account here for SMTP test.
| /src
| + -- template.html # <--- Build your email template here
| + -- /styles
| + -- + -- index.scss # <--- Add your SCSS here.
```

Unfortunatly imgur not suport .SVG ![facepalm](http://chatslang.com/images/shortcuts/twitch/admins/failfish.png)

---------------------------------

The MIT [License](https://raw.githubusercontent.com/webcaetano/email-maker/master/LICENSE.md)
