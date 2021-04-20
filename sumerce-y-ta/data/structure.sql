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
-- Table `sumerceyta`.`regions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`regions` (
  `idregion` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `ordinal` VARCHAR(5) NULL,
  PRIMARY KEY (`idregion`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sumerceyta`.`comunas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`comunas` (
  `idcomuna` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `region_id` INT NOT NULL,
  PRIMARY KEY (`idcomuna`),
  CONSTRAINT `fk_comunas_regions`
    FOREIGN KEY (`region_id`)
    REFERENCES `sumerceyta`.`regions` (`idregion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sumerceyta`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`users` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `phone` VARCHAR(13) NULL,
  `photo` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(100) NULL,
  `comuna_id` INT NOT NULL,
  PRIMARY KEY (`iduser`),
  CONSTRAINT `fk_users_comunas1`
    FOREIGN KEY (`comuna_id`)
    REFERENCES `sumerceyta`.`comunas` (`idcomuna`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sumerceyta`.`carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`carts` (
  `idcart` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT NULL,
  `price` INT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`idcart`),
  CONSTRAINT `fk_carts_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `sumerceyta`.`users` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sumerceyta`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`categories_products` (
  `idcategory` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(45) NULL,
  PRIMARY KEY (`idcategory`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sumerceyta`.`colors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`colors` (
  `idcolor` INT NOT NULL AUTO_INCREMENT,
  `color` VARCHAR(45) NULL,
  PRIMARY KEY (`idcolor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sumerceyta`.`sizes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`sizes` (
  `idsize` INT NOT NULL AUTO_INCREMENT,
  `size` VARCHAR(45) NULL,
  PRIMARY KEY (`idsize`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sumerceyta`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`products` (
  `idproduct` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `photo` VARCHAR(45) NULL,
  `description` LONGTEXT NULL,
  `price` INT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`idproduct`),
  CONSTRAINT `fk_products_categories1`
    FOREIGN KEY (`category_id`)
    REFERENCES `sumerceyta`.`categories_products` (`idcategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sumerceyta`.`ProductsColors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`ProductsColors` (
  `idproductscolor` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
    `color_id` INT NOT NULL,
  PRIMARY KEY (`idproductscolor`),
  CONSTRAINT `fk_colors_has_products_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `sumerceyta`.`products` (`idproduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_colors_has_products_colors1`
    FOREIGN KEY (`color_id`)
    REFERENCES `sumerceyta`.`colors` (`idcolor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sumerceyta`.`productssizes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`productssizes` (
  `idproductssizes` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `size_id` INT NOT NULL,
  PRIMARY KEY (`idproductssizes`),
  CONSTRAINT `fk_products_has_sizes_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `sumerceyta`.`products` (`idproduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_sizes_sizes1`
    FOREIGN KEY (`size_id`)
    REFERENCES `sumerceyta`.`sizes` (`idsize`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sumerceyta`.`productIncart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sumerceyta`.`productIncarts` (
  `productIncart` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `cart_id` INT NOT NULL,
  PRIMARY KEY (`productIncart`),
  CONSTRAINT `fk_products_has_carts_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `sumerceyta`.`products` (`idproduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_carts_carts1`
    FOREIGN KEY (`cart_id`)
    REFERENCES `sumerceyta`.`carts` (`idcart`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
