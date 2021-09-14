# Create database and user

As root of the system, you create specific user & password that can access the specific database you want.

```console
sudo mysql
```

After connecting to mysql, execute the following commands.

```SQL
use mysql;

SELECT user, host, plugin, authentication_string FROM mysql.user;
CREATE USER 'SingleCellManager'@'localhost' IDENTIFIED BY 'Camille34?';
UPDATE mysql.user SET authentication_string = PASSWORD('Camille34?') WHERE User = 'SingleCellManager' AND Host = 'localhost';

# Create database
# Grant user specific privileges

CREATE DATABASE SingleCell;

GRANT ALL PRIVILEGES on SingleCell.* TO 'SingleCellManager'@'localhost' identified by 'Camille34?';

FLUSH PRIVILEGES;

QUIT;
```

Then you can create empty tables.

```bash

# Maybe can be better on full text index
# Also json stuffs and @column(simple_array)
mysql -u SingleCellManager -D SingleCell -pCamille34? < database.schema.sql

# Insert use parse.raw.files.R 


#mysql -u SingleCellManager -D SingleCell -pCamille34? < truncate.tables.sql

#Rscript parse.raw.files.R 

```

```bash
mysql -u SingleCellManager -D SingleCell -pCamille34? 

```
```SQL
# For one gene , you will select interaction of the id.
# This is a great ressource !
#https://github.com/typeorm/typeorm/blob/master/docs/entities.md#column-types-for-mysql--mariadb
#https://github.com/typeorm/typeorm
SELECT `interactor`.* FROM `interactor` 
 JOIN   `interaction` ON  `interactor`.interaction_fk = `interaction`.interaction_id
 JOIN  `component` ON   `component`.component_id = `interaction`.component_fk
WHERE `component`.release_fk = 1 AND `interactor`.official_symbol = "TIE1";

SELECT `interactor`.* FROM `interactor` where `interactor`.interaction_fk IN (105,107,109,111) AND `interactor`.type = 'ligand' ORDER BY `interactor`.interaction_fk;
SELECT `interactor`.* FROM `interactor` where `interactor`.interaction_fk IN (105,107,109,111) AND `interactor`.type = 'receptor' ORDER BY `interactor`.interaction_fk ;

```