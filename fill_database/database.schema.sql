use SingleCell;

SET FOREIGN_KEY_CHECKS = 0;
SET GROUP_CONCAT_MAX_LEN=32768;
SET @tables = NULL;
SELECT GROUP_CONCAT('`', table_name, '`') INTO @tables
  FROM information_schema.tables
  WHERE table_schema = 'SingleCell';
SELECT IFNULL(@tables,'dummy') INTO @tables;

SET @tables = CONCAT('DROP TABLE IF EXISTS ', @tables);
PREPARE stmt FROM @tables;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
SET FOREIGN_KEY_CHECKS = 1;


CREATE TABLE IF NOT EXISTS `release`
(
  	release_id INT NOT NULL AUTO_INCREMENT, 
  	date DATE,
  	name VARCHAR(100),
  PRIMARY KEY ( release_id )
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS dataset
(
  	dataset_id INT NOT NULL AUTO_INCREMENT,
  	release_fk INT, 
  	name VARCHAR(100) ,
  	tissue VARCHAR(30),
  	type ENUM('bulk','single'),
  	organism VARCHAR(30),
 PRIMARY KEY ( dataset_id ),
 FOREIGN KEY ( release_fk ) REFERENCES `release`( release_id ) 
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS result
(  
    result_id INT NOT NULL AUTO_INCREMENT,
	dataset_fk INT, 
	test VARCHAR(100),
  PRIMARY KEY ( result_id ),
  FOREIGN KEY ( dataset_fk ) REFERENCES dataset ( dataset_id ) 
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS feature_release
(
  	feature_id INT NOT NULL AUTO_INCREMENT,
  	release_fk INT, 
  	category VARCHAR(25),
  	json_feature BLOB,
 PRIMARY KEY ( feature_id ),
 FOREIGN KEY ( release_fk ) REFERENCES `release`( release_id ) 
 ) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS component 
 (
  	component_id INT NOT NULL AUTO_INCREMENT, 
  	release_fk INT, 
    date DATE,  
  	name VARCHAR(100) NOT NULL,  
  PRIMARY KEY ( component_id ),
  FOREIGN KEY ( release_fk ) REFERENCES `release`( release_id ) 
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS feature_component 
 (
  	feature_id INT NOT NULL AUTO_INCREMENT,
  	component_fk INT, 
  	category VARCHAR(25),
  	json_feature BLOB,
 PRIMARY KEY ( feature_id ),
 FOREIGN KEY ( component_fk ) REFERENCES component( component_id ) 
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS interaction 
 (
  	interaction_id INT NOT NULL AUTO_INCREMENT, 
  	component_fk INT, 
  	source VARCHAR(50) NOT NULL,
  	pmid VARCHAR(50),
  	note VARCHAR(300),
  PRIMARY KEY ( interaction_id ),
  FOREIGN KEY ( component_fk ) REFERENCES component ( component_id ) 
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS interactor 
 (
  	interactor_id INT NOT NULL AUTO_INCREMENT, 
  	interaction_fk INT,
  	official_symbol VARCHAR(50) NOT NULL,
	  type ENUM('ligand', 'receptor') NOT NULL,
  	official_name VARCHAR(100) NOT NULL,  
    synonyms VARCHAR(150) NOT NULL,      
  	alternative_names VARCHAR(250) NOT NULL,     
  	json_feature BLOB ,
  PRIMARY KEY ( interactor_id ),
  INDEX official_symbol_index  (official_symbol),
  FOREIGN KEY ( interaction_fk ) REFERENCES interaction ( interaction_id ) 
) ENGINE = InnoDB;

#CREATE FULLTEXT INDEX synonyms_index ON interactor(synonyms);


SHOW TABLES;


