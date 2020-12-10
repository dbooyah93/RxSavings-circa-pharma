# Pharma-Find(API)

This repo contains a CSV to seed a MySQL database with. Feel free to seed your MySQL database with your own csv containing at least a latitude and longitude coloumn.

The repo will act as an API to return the closest in-network pharmacy based on input cordinates.


---

## Getting started

### Prerequisites

1. Git
1. Node
1. MySQL
1. A fork of this repo

### Setting up MySQL

1. Open your terminal and run the following commands
1. `sudo service mysql start`
1. Enter your administrative password<br/>
`* Starting MySQL database server mysqld`
1. sudo mysql<br/>
We do this to have maximum permission to freely set up mysql for the repo access<br/>
Save your decisions in a secure location because you will set up an .env file shortly
1. `CREATE DATABASE <databasename>;`
1. `USE <databasename>;`
1. `CREATE USER '<user>'@localhost IDENTIFIED BY '<userpassword>';`<br/>
More info and specifics on user creaion [here](https://dev.mysql.com/doc/refman/8.0/en/create-user.html).
1. `GRANT SELECT ON <databasename> TO '<user>'@localhost;`<br/>
More info and specifics on permssions [here](https://dev.mysql.com/doc/refman/8.0/en/grant.html).
1. `FLUSH PRIVILEGES;`<br/>
More info on FLUSHING [here](https://www.interserver.net/tips/kb/mysql-flush-commands/#:~:text=mysql%3E%20FLUSH%20PRIVILEGES%3B,reloading%20or%20restarting%20mysql%20service.).
1. CTRL + Z<br/>
You should be out of MySQL and back in your root folder in the CLI
1. `sudo service mysql restart`


### Initialization

1. In the CLI `git clone YOUR-GITHUB-FORK`
1. Navigate your CLI to the "RxSavings-circa-pharma" file
1. Run `npm install`
1. Observe the `.env` file that was created
1. Please include the following in the .env file based on the MySQL settings you chose.<br/>
```js
DB_HOST=<localhost>
DB_USER=< user name created in mysql >
DB_PASS=< the above user's password >
DB_DATABASE=< the database name >
PORT=< the port you want to use [DEFAULT IS 3000] >
```

---

Demo
This API will allow `GET` requests to `http://localhost:3000/api/loc/${userLatitude}/${userLongitude}` and respond with the closest in-network pharmacy as an object within an array which will look like:

```js
[
    {
        "id": 23,
        "name": "WAL-MART PHARMACY       ",
        "address": "600 NE CORONADO DRIVE",
        "city": "BLUE SPRINGS",
        "state": "MO",
        "zip": 64014,
        "latitude": 39.024193,
        "longitude": -94.25503,
        "miles": 254.14420820385334
    }
]
```
---

Technologies Used

---

Special Gotchase ( problmes faced, or unique elements )

---

Technical Description ( installation, setup, how to contribute )