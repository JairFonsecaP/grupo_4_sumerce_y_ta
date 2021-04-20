-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sumerceyta
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sumerceyta
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `sumerceyta` DEFAULT CHARACTER SET utf8 ;
USE `sumerceyta` ;

-- -----------------------------------------------------
-- Table `sumerceyta`.`Regions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`Regions` (
  `regionId` INT NOT NULL AUTO_INCREMENT,
  `region` VARCHAR(45) NOT NULL,
  `ordinal` VARCHAR(4) NOT NULL,
  PRIMARY KEY (`regionId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sumerceyta`.`Comunas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`Comunas` (
  `comunaId` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `region_id` INT NOT NULL,
  PRIMARY KEY (`comunaId`),
  
  CONSTRAINT `fk_Comunas_Regions1`
    FOREIGN KEY (`region_id`)
    REFERENCES `sumerceyta`.`Regions` (`regionId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB AUTO_INCREMENT=346;


-- -----------------------------------------------------
-- Table `sumerceyta`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`Users` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `phone` VARCHAR(15) NULL,
  `photo` VARCHAR(45) NULL,
  `email` VARCHAR(32) NULL,
  `password` VARCHAR(100) NULL,
  `comuna_id` INT NOT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `fk_Users_Comunas1`
    FOREIGN KEY (`comuna_id`)
    REFERENCES `sumerceyta`.`Comunas` (`comunaId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sumerceyta`.`Color`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`Color` (
  `colorId` INT NOT NULL AUTO_INCREMENT,
  `color` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`colorId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sumerceyta`.`Sizes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`Sizes` (
  `sizeId` INT NOT NULL AUTO_INCREMENT,
  `size` VARCHAR(4) NOT NULL,
  PRIMARY KEY (`sizeId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sumerceyta`.`Categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`Categories` (
  `categoryId` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`categoryId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sumerceyta`.`Products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`Products` (
  `ProductId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `photo` VARCHAR(45) NULL,
  `description` VARCHAR(500) NULL,
  `price` INT(8) NULL,
  PRIMARY KEY (`ProductId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sumerceyta`.`ProductsSizes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`ProductsSizes` (
  `ProductsSizesId` INT NOT NULL AUTO_INCREMENT,
  `productId` INT NOT NULL,
  `size_Id` INT NOT NULL,
  PRIMARY KEY (`ProductsSizesId`),
  CONSTRAINT `fk_Products_has_Sizes_Products1`
    FOREIGN KEY (`productId`)
    REFERENCES `sumerceyta`.`Products` (`ProductId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Products_has_Sizes_Sizes1`
    FOREIGN KEY (`size_Id`)
    REFERENCES `sumerceyta`.`Sizes` (`sizeId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sumerceyta`.`ProductsColor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`ProductsColor` (
  `ProductsColorId` INT NOT NULL,
  `product_id` INT NOT NULL,
  `color_id` INT NOT NULL,
  
  PRIMARY KEY (`ProductsColorId`),
  CONSTRAINT `fk_Products_has_Color_Products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `sumerceyta`.`Products` (`ProductId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Products_has_Color_Color1`
    FOREIGN KEY (`color_id`)
    REFERENCES `sumerceyta`.`Color` (`colorId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sumerceyta`.`Products_has_Categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`ProductsCategories` (
  `ProductsCategoriesId` INT NOT NULL AUTO_INCREMENT,
  `product_Id` INT NOT NULL,
  `category_Id` INT NOT NULL,
  
  PRIMARY KEY (`ProductsCategoriesId`),
  CONSTRAINT `fk_Products_has_Categories_Products1`
    FOREIGN KEY (`product_Id`)
    REFERENCES `sumerceyta`.`Products` (`ProductId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Products_has_Categories_Categories1`
    FOREIGN KEY (`category_Id`)
    REFERENCES `sumerceyta`.`Categories` (`categoryId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sumerceyta`.`Carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`Carts` (
  `cartsId` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT NOT NULL,
  `price` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`cartsId`),
  
  CONSTRAINT `fk_Carts_Users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `sumerceyta`.`Users` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sumerceyta`.`CartProducts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`CartProducts` (
  `CartProductsId` INT NOT NULL AUTO_INCREMENT,
  `carts_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  
  PRIMARY KEY (`CartProductsId`),
  CONSTRAINT `fk_Carts_has_Products_Carts1`
    FOREIGN KEY (`carts_id`)
    REFERENCES `sumerceyta`.`Carts` (`cartsId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Carts_has_Products_Products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `sumerceyta`.`Products` (`ProductId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
