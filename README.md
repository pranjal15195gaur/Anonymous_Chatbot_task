


install node modules using this command
```
npm install express 
npm install mysql 
npm install socket.io
```
or simply put this command
```
npm install
```

Create sql database named interiittask and run this query also change name of username and password if necessary in app.js file
    
```
    CREATE TABLE scores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    team VARCHAR(255) NOT NULL,
    score INT NOT NULL
);
```


## run node app using this command


```bash
node app.js
```

## open browser and go to this url

```bash
http://localhost:3000
```


