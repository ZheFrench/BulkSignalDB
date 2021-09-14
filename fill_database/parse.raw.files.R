suppressPackageStartupMessages(library(dplyr))
suppressPackageStartupMessages(library(glue))
suppressPackageStartupMessages(library(data.table))
suppressPackageStartupMessages(library(tibble))
suppressPackageStartupMessages(library(RMariaDB))
suppressPackageStartupMessages(library(DBI))
suppressPackageStartupMessages(library(rjson))

# Connection
scsDB <- dbConnect(RMariaDB::MariaDB(), user = 'SingleCellManager', password = 'Camille34?' , dbname = 'SingleCell', host = 'localhost')
dbListTables(scsDB)


#####################################################
#######					RELEASE			      #######
#####################################################
# Data
date.release <- "2021-07-23"
name.release  <- "Version2"
release.data <- cbind(date = date.release,name = name.release)
release.data <- as.data.frame(release.data)

# Insert
dbWriteTable(scsDB, "release", release.data,append=TRUE)

# Wait , you need to retrieve the corresponding ID in release.
command.release.id <- dbSendQuery(scsDB, "SELECT release_id FROM `release` WHERE release_id = LAST_INSERT_ID()")
release.id <- dbFetch(command.release.id)
dbClearResult(command.release.id)

release.id <- as.integer(release.id)

#####################################################
#######				FEATURE_RELEASE	      ###########
#####################################################

# Data
# ------------------------------------------------------
stats <- vector(mode="list")

stats[["nb.ligand"]]   <- c(3232)
stats[["nb.receptor"]] <- c(6666)
stats[["nb.pair"]]     <- c(3533)
json.stats <- toJSON(stats)

features.release.data1 <- cbind(release_fk=release.id, category = "stat",json_feature = json.stats)
features.release.data1 <- as.data.frame(features.release.data1)

# ------------------------------------------------------

database <- vector(mode="list")

database[["Fantom5"]]   <- c("janv-2020")
database[["IUPHAR/BPS Guide to Pharmacology"]] <- c("V4")

json.database <- toJSON(database)

features.release.data2 <- cbind(release_fk=release.id, category = "database",json_feature = json.database)
features.release.data2 <- as.data.frame(features.release.data2)

features.release.data <- rbind(features.release.data1, features.release.data2)

#Insert
dbWriteTable(scsDB, "feature_release", features.release.data, append=TRUE)

#####################################################
#######				COMPONENT			      #######
#####################################################
# Data
component.data <- cbind(date=c("2010-03-12"),release_fk=release.id,name=c("human"))
component.data <- as.data.frame(component.data)

# Insert
dbWriteTable(scsDB, "component", component.data,append=TRUE)

# Wait , you need to retrieve the corresponding ID in release.
command.component.id <- dbSendQuery(scsDB, "SELECT component_id FROM `component` WHERE component_id = LAST_INSERT_ID()")
component.id 	     <- dbFetch(command.component.id)
dbClearResult(command.component.id)

component.id <- as.integer(component.id)
##############################################################
#######				FEATURE_COMPONENT			      ########
##############################################################
# Data
organism <- vector(mode="list")

organism[["gencode.Human"]] <- c("27")
organism[["genome.Human"]] <- c("GRCh38")

json.organism<- toJSON(organism)
json.organism

features.component.data <- cbind(component_fk=component.id, category = "organism",json_feature = json.organism)
features.component.data <- as.data.frame(features.component.data)

#Insert
dbWriteTable(scsDB, "feature_component", features.component.data, append=TRUE)

#ligand	receptor	ligand.name	receptor.name	ligand.synonyms	receptor.synonyms	ligand.altern.names	receptor.altern.names	source	PMIDs	cells.L	cells.R	remarks
#A2M	LRP1	Alpha-2-macroglobulin	Prolow-density lipoprotein receptor-related protein 1	CPAMD5,FWP007	A2MR,APR	Alpha-2-M || C3 and PZP-like alpha-2-macroglobulin domain-containing protein 5	LRP-1 || Alpha-2-macroglobulin receptor || A2MR || Apolipoprotein E receptor || APOER || CD antigen CD91) [Cleaved into: Low-density lipoprotein receptor-related protein 1 85 kDa subuni || LRP-85); Low-density lipoprotein receptor-related protein 1 515 kDa subuni || LRP-515); Low-density lipoprotein receptor-related protein 1 intracellular domai || LRPICD)	fantom5,HPMR,HPRD	10652313			

dataframe <- fread(glue("/home/jp/eclipse-workspace/Vue/scs/rawdata/LRdb_122019.txt"),data.table = F)
#head(dataframe,n = 2)

dataframe$pmid         <-  dataframe$PMIDs
dataframe$component_fk <-  component.id



##############################################################
#######				INTERACTION	+ INTERACTOR	      ########
##############################################################
insert <- function(x) { 
	dbWriteTable(scsDB, "interaction", x %>% select(source,pmid,component_fk), append=TRUE)

	# Wait , you need to retrieve the corresponding ID in release.
	command.interaction.id <- dbSendQuery(scsDB, "SELECT interaction_id FROM `interaction` WHERE interaction_id = LAST_INSERT_ID()")
	interaction.id <- dbFetch(command.interaction.id)
	dbClearResult(command.interaction.id)

	# Rename columns as database column names where you want to insert the corresponding data.

	dataframe.ligand   <- x %>% select( ligand, ligand.name, ligand.synonyms, ligand.altern.names )

	colnames(dataframe.ligand)[which(names(dataframe.ligand) == "ligand")] <- "official_symbol"
	colnames(dataframe.ligand)[which(names(dataframe.ligand) == "ligand.name")] <- "official_name"
	colnames(dataframe.ligand)[which(names(dataframe.ligand) == "ligand.synonyms")] <- "synonyms"
	colnames(dataframe.ligand)[which(names(dataframe.ligand) == "ligand.altern.names")] <- "alternative_names"
	dataframe.ligand$type  <- "ligand"

	dataframe.receptor <- x %>% select( receptor, receptor.name, receptor.synonyms, receptor.altern.names )

	colnames(dataframe.receptor)[which(names(dataframe.receptor) == "receptor")] <- "official_symbol"
	colnames(dataframe.receptor)[which(names(dataframe.receptor) == "receptor.name")] <- "official_name"
	colnames(dataframe.receptor)[which(names(dataframe.receptor) == "receptor.synonyms")] <- "synonyms"
	colnames(dataframe.receptor)[which(names(dataframe.receptor) == "receptor.altern.names")] <- "alternative_names"
	dataframe.receptor$type  <- "receptor"


	dataframe.ligand$interaction_fk  <- as.numeric(interaction.id)
	dataframe.receptor$interaction_fk <- as.numeric(interaction.id)
	#dataframe.ligand$json_feature   <- ""
	#dataframe.receptor$json_feature <- ""

	dbWriteTable(scsDB, dataframe.ligand %>% select(interaction_fk,official_symbol,type,synonyms,official_name,alternative_names), name = "interactor",  append=TRUE) 
	dbWriteTable(scsDB, dataframe.receptor %>% select(interaction_fk,official_symbol,type,synonyms,official_name,alternative_names), name = "interactor", append=TRUE) 


}

for ( row.index in 1:nrow(dataframe)){

	insert(dataframe[row.index,])
}


dbDisconnect(scsDB)
