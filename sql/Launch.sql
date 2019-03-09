CREATE DATABASE  IF NOT EXISTS `yeeplus_backend` /*!40100 DEFAULT CHARACTER SET utf8 */;

CREATE USER IF NOT EXISTS 'yeeplus'@'localhost' IDENTIFIED BY 'yeeplus';
GRANT ALL PRIVILEGES ON yeeplus_backend.* TO 'yeeplus'@'localhost';
