-- MySQL dump 10.13  Distrib 8.0.16, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: yocto_erp
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `acl_action`
--

DROP TABLE IF EXISTS `acl_action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `acl_action` (
  `id` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `type` int(11) DEFAULT '1',
  `moduleId` int(11) NOT NULL,
  `remark` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_action`
--

LOCK TABLES `acl_action` WRITE;
/*!40000 ALTER TABLE `acl_action` DISABLE KEYS */;
INSERT INTO `acl_action` (`id`, `name`, `type`, `moduleId`, `remark`) VALUES (1,'Create Product',1,1,NULL),(2,'Read Product',1,1,NULL),(3,'Update Product',1,1,NULL),(4,'Delete Product',1,1,NULL),(5,'Create Customer',1,2,NULL),(6,'Read Customer',1,2,NULL),(7,'Update Customer',1,2,NULL),(8,'Delete Customer',1,2,NULL),(9,'Create Order',1,3,NULL),(10,'Read Order',2,3,NULL),(11,'Update Order',2,3,NULL),(12,'Delete Order',2,3,NULL),(13,'Create Inventory',1,4,NULL),(14,'Read Inventory',1,4,NULL),(15,'Update Inventory',1,4,NULL),(16,'Delete Inventory',1,4,NULL),(17,'Create Warehouse',1,5,NULL),(18,'Read Warehouse',1,5,NULL),(19,'Update Warehouse',1,5,NULL),(20,'Delete Warehouse',1,5,NULL);
/*!40000 ALTER TABLE `acl_action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_group`
--

DROP TABLE IF EXISTS `acl_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `acl_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `remark` text,
  `createdById` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_group`
--

LOCK TABLES `acl_group` WRITE;
/*!40000 ALTER TABLE `acl_group` DISABLE KEYS */;
INSERT INTO `acl_group` (`id`, `name`, `remark`, `createdById`) VALUES (1,'COMPANY_GROUP','Default group for master access',0),(2,'COMPANY_GROUP','Default group for master access',0);
/*!40000 ALTER TABLE `acl_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_group_action`
--

DROP TABLE IF EXISTS `acl_group_action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `acl_group_action` (
  `groupId` int(11) NOT NULL,
  `actionId` int(11) NOT NULL,
  `type` int(11) DEFAULT '1',
  PRIMARY KEY (`groupId`,`actionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_group_action`
--

LOCK TABLES `acl_group_action` WRITE;
/*!40000 ALTER TABLE `acl_group_action` DISABLE KEYS */;
INSERT INTO `acl_group_action` (`groupId`, `actionId`, `type`) VALUES (1,1,3),(1,2,3),(1,3,3),(1,4,3),(1,5,3),(1,6,3),(1,7,3),(1,8,3),(1,9,3),(1,10,3),(1,11,3),(1,12,3),(1,13,3),(1,14,3),(1,15,3),(1,16,3),(1,17,3),(1,18,3),(1,19,3),(1,20,3),(2,1,3),(2,2,3),(2,3,3),(2,4,3),(2,5,3),(2,6,3),(2,7,3),(2,8,3),(2,9,3),(2,10,3),(2,11,3),(2,12,3),(2,13,3),(2,14,3),(2,15,3),(2,16,3),(2,17,3),(2,18,3),(2,19,3),(2,20,3);
/*!40000 ALTER TABLE `acl_group_action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_group_action_shop`
--

DROP TABLE IF EXISTS `acl_group_action_shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `acl_group_action_shop` (
  `groupId` int(11) NOT NULL,
  `actionId` int(11) NOT NULL,
  `shopId` bigint(20) NOT NULL,
  PRIMARY KEY (`groupId`,`actionId`,`shopId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_group_action_shop`
--

LOCK TABLES `acl_group_action_shop` WRITE;
/*!40000 ALTER TABLE `acl_group_action_shop` DISABLE KEYS */;
/*!40000 ALTER TABLE `acl_group_action_shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_module`
--

DROP TABLE IF EXISTS `acl_module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `acl_module` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `remark` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_module`
--

LOCK TABLES `acl_module` WRITE;
/*!40000 ALTER TABLE `acl_module` DISABLE KEYS */;
INSERT INTO `acl_module` (`id`, `name`, `remark`) VALUES (1,'Product','Manage product.'),(2,'Customer','Manage customer'),(3,'Order','Manage Order'),(4,'Inventory','Manage inventory'),(5,'WareHouse','Manage Warehouse');
/*!40000 ALTER TABLE `acl_module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset`
--

DROP TABLE IF EXISTS `asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `asset` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `fileId` varchar(64) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `asset_fileId_uindex` (`fileId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset`
--

LOCK TABLES `asset` WRITE;
/*!40000 ALTER TABLE `asset` DISABLE KEYS */;
/*!40000 ALTER TABLE `asset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `company` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `gsm` varchar(20) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `remark` text,
  `createdDate` datetime DEFAULT NULL,
  `createdById` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_own_company`
--

DROP TABLE IF EXISTS `company_own_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `company_own_company` (
  `companyId` bigint(20) NOT NULL,
  `partnerCompanyId` bigint(20) NOT NULL,
  PRIMARY KEY (`companyId`,`partnerCompanyId`),
  KEY `company_partner___fk` (`partnerCompanyId`),
  CONSTRAINT `company_own_id_fk` FOREIGN KEY (`companyId`) REFERENCES `company` (`id`),
  CONSTRAINT `company_partner___fk` FOREIGN KEY (`partnerCompanyId`) REFERENCES `company` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_own_company`
--

LOCK TABLES `company_own_company` WRITE;
/*!40000 ALTER TABLE `company_own_company` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_own_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_partner_person`
--

DROP TABLE IF EXISTS `company_partner_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `company_partner_person` (
  `partnerCompanyId` bigint(20) NOT NULL,
  `personId` bigint(20) NOT NULL,
  PRIMARY KEY (`partnerCompanyId`,`personId`),
  KEY `partner_company_person_person_id_fk` (`personId`),
  CONSTRAINT `partner_company_person_company_id_fk` FOREIGN KEY (`partnerCompanyId`) REFERENCES `company` (`id`) ON DELETE CASCADE,
  CONSTRAINT `partner_company_person_person_id_fk` FOREIGN KEY (`personId`) REFERENCES `person` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_partner_person`
--

LOCK TABLES `company_partner_person` WRITE;
/*!40000 ALTER TABLE `company_partner_person` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_partner_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_person`
--

DROP TABLE IF EXISTS `company_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `company_person` (
  `companyId` bigint(20) NOT NULL,
  `personId` bigint(20) NOT NULL,
  PRIMARY KEY (`companyId`,`personId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_person`
--

LOCK TABLES `company_person` WRITE;
/*!40000 ALTER TABLE `company_person` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_shop`
--

DROP TABLE IF EXISTS `company_shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `company_shop` (
  `companyId` bigint(20) NOT NULL,
  `shopId` bigint(20) NOT NULL,
  PRIMARY KEY (`shopId`,`companyId`),
  KEY `user_company_fk` (`companyId`),
  CONSTRAINT `user_company_fk` FOREIGN KEY (`companyId`) REFERENCES `company` (`id`),
  CONSTRAINT `user_company_shop_shop_id_fk` FOREIGN KEY (`shopId`) REFERENCES `shop` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_shop`
--

LOCK TABLES `company_shop` WRITE;
/*!40000 ALTER TABLE `company_shop` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cost`
--

DROP TABLE IF EXISTS `cost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cost` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `totalAmount` decimal(16,2) DEFAULT NULL,
  `remark` text,
  `companyId` bigint(20) DEFAULT NULL,
  `createdById` bigint(20) DEFAULT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `processedDate` datetime DEFAULT NULL,
  `lastModifiedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `lastModifiedById` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cost_companyId_createdById_processedDate_index` (`companyId`,`createdById`,`processedDate`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cost`
--

LOCK TABLES `cost` WRITE;
/*!40000 ALTER TABLE `cost` DISABLE KEYS */;
/*!40000 ALTER TABLE `cost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cost_detail`
--

DROP TABLE IF EXISTS `cost_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cost_detail` (
  `costId` bigint(20) NOT NULL,
  `id` int(11) NOT NULL,
  `productId` bigint(20) NOT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `amount` decimal(16,2) DEFAULT NULL,
  `price` decimal(16,2) DEFAULT NULL,
  `remark` text,
  `unitId` int(11) DEFAULT NULL,
  PRIMARY KEY (`costId`,`id`),
  CONSTRAINT `cost_detail_cost_id_fk` FOREIGN KEY (`costId`) REFERENCES `cost` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cost_detail`
--

LOCK TABLES `cost_detail` WRITE;
/*!40000 ALTER TABLE `cost_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `cost_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `customer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `phone` varchar(250) DEFAULT NULL,
  `address` text,
  `remark` text,
  `createdById` bigint(20) DEFAULT NULL,
  `companyId` bigint(20) DEFAULT NULL,
  `createdDate` datetime DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_send`
--

DROP TABLE IF EXISTS `email_send`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `email_send` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `from` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `to` text COLLATE utf8mb4_general_ci NOT NULL,
  `cc` text COLLATE utf8mb4_general_ci,
  `bcc` text COLLATE utf8mb4_general_ci,
  `subject` varchar(512) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_general_ci,
  `status` tinyint(1) DEFAULT NULL,
  `retry` int(11) DEFAULT NULL,
  `api_response` text COLLATE utf8mb4_general_ci,
  `sent_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_send`
--

LOCK TABLES `email_send` WRITE;
/*!40000 ALTER TABLE `email_send` DISABLE KEYS */;
INSERT INTO `email_send` (`id`, `from`, `to`, `cc`, `bcc`, `subject`, `content`, `status`, `retry`, `api_response`, `sent_date`) VALUES (1,'info@crypto-limited.ltd','lephuoccanh@gmail.com','','','Welcome to CryptoCash Community','<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\"\n        \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html style=\"font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\"\n      xmlns=\"http://www.w3.org/1999/xhtml\">\n<head>\n    <meta content=\"width=device-width\" name=\"viewport\"/>\n    <meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"/>\n    <title>Welcome to CryptoCash Community</title>\n\n\n    <style type=\"text/css\">\n        img {\n            max-width: 100%;\n        }\n\n        body {\n            -webkit-font-smoothing: antialiased;\n            -webkit-text-size-adjust: none;\n            width: 100% !important;\n            height: 100%;\n            line-height: 1.6em;\n        }\n\n        body {\n            background-color: #f6f6f6;\n        }\n\n        @media only screen and (max-width: 640px) {\n            body {\n                padding: 0 !important;\n            }\n\n            h1 {\n                font-weight: 800 !important;\n                margin: 20px 0 5px !important;\n            }\n\n            h2 {\n                font-weight: 800 !important;\n                margin: 20px 0 5px !important;\n            }\n\n            h3 {\n                font-weight: 800 !important;\n                margin: 20px 0 5px !important;\n            }\n\n            h4 {\n                font-weight: 800 !important;\n                margin: 20px 0 5px !important;\n            }\n\n            h1 {\n                font-size: 22px !important;\n            }\n\n            h2 {\n                font-size: 18px !important;\n            }\n\n            h3 {\n                font-size: 16px !important;\n            }\n\n            .container {\n                padding: 0 !important;\n                width: 100% !important;\n            }\n\n            .content {\n                padding: 0 !important;\n            }\n\n            .content-wrap {\n                padding: 10px !important;\n            }\n\n            .invoice {\n                width: 100% !important;\n            }\n        }\n    </style>\n</head>\n\n<body bgcolor=\"#f6f6f6\" itemscope\n      itemtype=\"http://schema.org/EmailMessage\"\n      style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;\">\n\n<table bgcolor=\"#f6f6f6\"\n       class=\"body-wrap\"\n       style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;\">\n    <tr style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\">\n        <td style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;\"\n            valign=\"top\"></td>\n        <td class=\"container\" style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;\"\n            valign=\"top\"\n            width=\"600\">\n            <div class=\"content\"\n                 style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;\">\n                <table bgcolor=\"#fff\" cellpadding=\"0\" cellspacing=\"0\" class=\"main\" itemprop=\"action\" itemscope\n                       itemtype=\"http://schema.org/ConfirmAction\"\n                       style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;\"\n                       width=\"100%\">\n                    <tr style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\">\n                        <td class=\"content-wrap\"\n                            style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;\"\n                            valign=\"top\">\n                            <meta content=\"Confirm Email\" itemprop=\"name\"\n                                  style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\"/>\n                            <table cellpadding=\"0\" cellspacing=\"0\" style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\"\n                                   width=\"100%\">\n                                <tr style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\">\n                                    <td class=\"content-block\"\n                                        style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;\"\n                                        valign=\"top\">\n                                        Hello <strong>undefined (undefined)</strong>\n                                    </td>\n                                </tr>\n                                <tr style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\">\n                                    <td class=\"content-block\"\n                                        style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;\"\n                                        valign=\"top\">\n                                        You are now our member in CryptoCash Community\n                                    </td>\n                                </tr>\n<tr style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\">\n                                    <td class=\"content-block\" itemprop=\"handler\" itemscope\n                                        itemtype=\"http://schema.org/HttpActionHandler\"\n                                        style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;\"\n                                        valign=\"top\">\n                                        <a class=\"btn-primary\" href=\"http://localhost:4201/email-activate?email=lephuoccanh@gmail.com&token=a2ce39bfdbe9eadc61e1073d5bcf5b40\" itemprop=\"url\"\n                                           style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #348eda; margin: 0; border-color: #348eda; border-style: solid; border-width: 10px 20px;\">Confirm your Email Address</a>\n                                    </td>\n                                </tr>\n                                <tr style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\">\n                                    <td class=\"content-block\"\n                                        style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;\"\n                                        valign=\"top\">\n                                        Best Regards,<br>\n                                        Crypto Limited Support TEAM\n                                    </td>\n                                </tr>\n\n                            </table>\n                        </td>\n                    </tr>\n                </table>\n                <div class=\"footer\"\n                     style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;\">\n                    <table style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\"\n                           width=\"100%\">\n                        <tr style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\">\n                            <td align=\"center\"\n                                class=\"aligncenter content-block\"\n                                style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; color: #999; text-align: center; margin: 0; padding: 0 0 20px;\" valign=\"top\"> <a href=\"http://twitter.com/mlm\"\n                                                                      style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; color: #999; text-decoration: underline; margin: 0;\"></a>2018 copyright @ crypto-limited.ltd\n                            </td>\n                        </tr>\n                    </table>\n                </div>\n            </div>\n        </td>\n        <td style=\"font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;\"\n            valign=\"top\"></td>\n    </tr>\n</table>\n</body>\n</html>\n',1,0,'{\"id\":\"<20200703183206.1.1B4D2B7FF448DA5D@mg.tworld101.com>\",\"message\":\"Queued. Thank you.\"}','2020-07-03 18:32:07');
/*!40000 ALTER TABLE `email_send` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `inventory` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `warehouseId` bigint(20) DEFAULT NULL,
  `processedDate` datetime DEFAULT NULL,
  `insertedDate` datetime DEFAULT NULL,
  `createdById` bigint(20) NOT NULL,
  `companyId` bigint(20) NOT NULL,
  `totalProduct` int(11) DEFAULT NULL,
  `remark` text,
  PRIMARY KEY (`id`),
  KEY `inventory_createdById_companyId_index` (`createdById`,`companyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_detail`
--

DROP TABLE IF EXISTS `inventory_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `inventory_detail` (
  `inventoryId` bigint(20) NOT NULL,
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` decimal(14,2) DEFAULT NULL,
  `remark` text,
  PRIMARY KEY (`inventoryId`,`id`),
  CONSTRAINT `inventory_detail_inventory_id_fk` FOREIGN KEY (`inventoryId`) REFERENCES `inventory` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_detail`
--

LOCK TABLES `inventory_detail` WRITE;
/*!40000 ALTER TABLE `inventory_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_summary`
--

DROP TABLE IF EXISTS `inventory_summary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `inventory_summary` (
  `warehouseId` bigint(20) NOT NULL,
  `productId` bigint(20) NOT NULL,
  `unitId` int(11) NOT NULL,
  `quantity` decimal(16,2) DEFAULT '0.00',
  `lastModifiedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `companyId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`warehouseId`,`productId`,`unitId`),
  KEY `inventory_summary_index` (`warehouseId`,`productId`,`unitId`,`companyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_summary`
--

LOCK TABLES `inventory_summary` WRITE;
/*!40000 ALTER TABLE `inventory_summary` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory_summary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `order` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `purchasedDate` datetime DEFAULT NULL,
  `customerId` bigint(20) NOT NULL,
  `createdDate` datetime DEFAULT NULL,
  `createdById` bigint(20) NOT NULL,
  `companyId` datetime NOT NULL,
  `totalAmount` decimal(16,2) DEFAULT NULL,
  `remark` text,
  `shopId` bigint(20) NOT NULL,
  `lastModifiedDate` datetime DEFAULT NULL,
  `lastModifiedById` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order__date_index` (`companyId`,`createdDate`),
  KEY `order_company_shop__index` (`shopId`,`companyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `order_detail` (
  `orderId` bigint(20) NOT NULL,
  `id` int(11) NOT NULL,
  `productId` bigint(20) DEFAULT NULL,
  `productUnitId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '0',
  `amount` decimal(14,2) NOT NULL DEFAULT '0.00',
  `price` decimal(14,2) NOT NULL DEFAULT '0.00',
  `remark` text,
  PRIMARY KEY (`orderId`,`id`),
  CONSTRAINT `order_detail_order_id_fk` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `person` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `lastName` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `gsm` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `sex` tinyint(4) DEFAULT NULL,
  `createdById` int(11) DEFAULT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `imageId` bigint(20) DEFAULT NULL COMMENT 'Default image preview.',
  `priceBaseUnit` decimal(16,2) DEFAULT NULL,
  `remark` text,
  `companyId` bigint(20) DEFAULT NULL,
  `createdById` bigint(20) DEFAULT NULL,
  `insertedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_name_index` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_asset`
--

DROP TABLE IF EXISTS `product_asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `product_asset` (
  `assetId` bigint(20) NOT NULL,
  `productId` bigint(20) NOT NULL,
  PRIMARY KEY (`productId`,`assetId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_asset`
--

LOCK TABLES `product_asset` WRITE;
/*!40000 ALTER TABLE `product_asset` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_asset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_unit`
--

DROP TABLE IF EXISTS `product_unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `product_unit` (
  `productId` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT '1.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_unit`
--

LOCK TABLES `product_unit` WRITE;
/*!40000 ALTER TABLE `product_unit` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_unit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop`
--

DROP TABLE IF EXISTS `shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `shop` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `address` varchar(250) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `companyId` bigint(20) NOT NULL,
  `createdDate` datetime DEFAULT NULL,
  `createdById` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop`
--

LOCK TABLES `shop` WRITE;
/*!40000 ALTER TABLE `shop` DISABLE KEYS */;
/*!40000 ALTER TABLE `shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_property`
--

DROP TABLE IF EXISTS `system_property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `system_property` (
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `value` text COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_property`
--

LOCK TABLES `system_property` WRITE;
/*!40000 ALTER TABLE `system_property` DISABLE KEYS */;
/*!40000 ALTER TABLE `system_property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) DEFAULT NULL,
  `displayName` varchar(250) DEFAULT NULL,
  `imageUrl` text,
  `pwd` varchar(256) DEFAULT NULL,
  `insertedDate` datetime DEFAULT NULL,
  `personId` bigint(20) DEFAULT NULL,
  `email_active` tinyint(1) NOT NULL DEFAULT '0',
  `gsm` varchar(20) DEFAULT NULL,
  `remark` text,
  `status` int(11) DEFAULT '1',
  `createdById` bigint(20) NOT NULL DEFAULT '0',
  `groupId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_email_uindex` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `email`, `displayName`, `imageUrl`, `pwd`, `insertedDate`, `personId`, `email_active`, `gsm`, `remark`, `status`, `createdById`, `groupId`) VALUES (1,'lephuoccanh@gmail.com',NULL,NULL,'$2b$10$KuvTGT1Wv.qzDhy/Mc2EqO2YSnONjI.7V1Kqf9rGBuNTf/5e7M0jq','2020-07-03 18:32:04',NULL,1,NULL,NULL,1,0,2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_activate`
--

DROP TABLE IF EXISTS `user_activate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_activate` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `active_code` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_inserted` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_activate`
--

LOCK TABLES `user_activate` WRITE;
/*!40000 ALTER TABLE `user_activate` DISABLE KEYS */;
INSERT INTO `user_activate` (`id`, `user_id`, `active_code`, `date_inserted`) VALUES (1,1,'a2ce39bfdbe9eadc61e1073d5bcf5b40','2020-07-03 18:32:04');
/*!40000 ALTER TABLE `user_activate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_company`
--

DROP TABLE IF EXISTS `user_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_company` (
  `userId` bigint(20) NOT NULL,
  `companyId` bigint(20) NOT NULL,
  `type` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`userId`,`companyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_company`
--

LOCK TABLES `user_company` WRITE;
/*!40000 ALTER TABLE `user_company` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_reset_password`
--

DROP TABLE IF EXISTS `user_reset_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_reset_password` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `token` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL,
  `expired_time` datetime DEFAULT NULL,
  `confirmed` tinyint(1) DEFAULT NULL,
  `date_inserted` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_reset_password`
--

LOCK TABLES `user_reset_password` WRITE;
/*!40000 ALTER TABLE `user_reset_password` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_reset_password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_shop`
--

DROP TABLE IF EXISTS `user_shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_shop` (
  `userId` bigint(20) NOT NULL,
  `shopId` bigint(20) NOT NULL,
  PRIMARY KEY (`userId`,`shopId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_shop`
--

LOCK TABLES `user_shop` WRITE;
/*!40000 ALTER TABLE `user_shop` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse`
--

DROP TABLE IF EXISTS `warehouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `warehouse` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `address` text,
  `userId` bigint(20) DEFAULT NULL,
  `companyId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse`
--

LOCK TABLES `warehouse` WRITE;
/*!40000 ALTER TABLE `warehouse` DISABLE KEYS */;
/*!40000 ALTER TABLE `warehouse` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-16 11:22:47
