<?php
    echo "Section de test <br>";
    $connexion = mysqli_connect("localhost","root","");
    $database  = mysqli_select_db($connexion,"test_1");

    $requete_1   = " CREATE DATABASE test_1;";
    $requete_2   = " CREATE TABLE tab(codeTab int NOT NULL,nomTab varchar(64) NOT NULL);";
    $requete_3   = " INSERT INTO tab(codeTab,nomTab) values (10,'ahmed') ";
    $requete_4   = " DROP DATABASE test_1 ";
    $requete_5   = " CREATE TABLE boy AS SELECT codeTab,nomTab FROM tab WHERE nomTab = 'Ahmed';";
    $requete_6   = " TRUNCATE TABLE boy ";
    $requete_7   = " DROP TABLE boy ";
    $requete_8   = " ALTER TABLE boy add prenomTab varchar(255) NOT NULL ";
    $requete_9   = " ALTER TABLE boy DROP prenomTab";
    $requete_10   = " ALTER TABLE boy MODIFY p";
    $requete_11   = " CREATE TABLE tab_1(codeTab int , nomTab varchar(255) ,CONSTRAINT CONS UNIQUE(nomTab,codeTab) ) ";
    $requete_12   = " INSERT tab_1(codeTab , nomTab) values (20,'ahmed') ";
    $requete_13   = " ALTER TABLE tab_1 DROP CONSTRAINT CONS ";
    $requete_14   = " ALTER TABLE tab_1 ADD CONSTRAINT CONS UNIQUE(nomTab,codeTab) ";
    $requete_15   = " DROP TABLE tab_1 ";
    //Foreign key tuto
    $requete_16   = " CREATE TABLE agence(codeAgence int NOT NULL AUTO_INCREMENT,nomAgence varchar(255),adresseAgence varchar(255), PRIMARY KEY (codeAgence)) ";
    $requete_17   = " CREATE TABLE personnel(codePersonnel int NOT NULL AUTO_INCREMENT,nomPersonnel varchar(255) ,prenomPersonnel varchar(255) ,codeAgence int NOT NULL,FOREIGN KEY (codeAgence) REFERENCES agence(codeAgence),PRIMARY KEY (codePersonnel)) ";
    $requete_18   = " INSERT INTO agence(nomAgence,adresseAgence) values('Al Khayer','NR 05 RUE 07 AV AL IRFAN') ";
    //Select Column based on value from other table
    //Select 'agence' that have a 'personnel'
    $requete_20   = " SELECT * FROM voiture WHERE NOT EXISTS ( SELECT * FROM reservation WHERE reservation.codeVoiture = voiture.CodeVoiture AND etatReservation = 'loué'  ) ";
    $requete_21   = " SELECT personnel.codeAgence AS personnelCodeAgence,agence.codeAgence AS agenceCodeAgence,nomPersonnel,nomAgence,codePersonnel FROM agence,personnel WHERE personnel.codeAgence = agence.codeAgence";
    $requete_22   = " UPDATE agence SET nomAgence = 'Ahmadi' WHERE codeAgence = 2 ";
    //end Foreign key tuto
    // $result = mysqli_query($connexion,"DROP TABLE personnel"); 
    // $result = mysqli_query($connexion,"DROP TABLE agence"); 
    
    // $result = mysqli_query($connexion,$requete_16); 
    // $result = mysqli_query($connexion,$requete_17);  
    // $result = mysqli_query($connexion,$requete_18); 
    // $requete_19   = " INSERT INTO personnel(nomPersonnel,prenomPersonnel,codeAgence) values ('SLIMANI','Mustapha',".mysqli_insert_id( $connexion ).") ";
    echo "<br>".$requete_20."<br>";
    $result = mysqli_query($connexion,$requete_22); 
    // $counter = 10;
    // $table = mysqli_fetch_array($result);
    // echo $table["voiture"];
    if($result){
        echo " Requete execute !!! ";
        // while( $table = mysqli_fetch_array($result) ){
        //     echo "<br> immatriculation : ".$table["immatriculationVoiture"]."<br>";
        // }
    }
    else{
        echo " Requete non execute ";
    }
    
    // if($result){
    //     echo "requete execute <br> table length: ".mysqli_num_rows($result)."<br>";
    //     $table = mysqli_fetch_array($result);
    //     while($table && $counter--)
    //     {
    //         echo  $table["name"]."<br>";
    //         $table = mysqli_fetch_array($result);
    //     }
    // }
    // else{
    //     echo "requete n'est pas execute";
    // }
?>