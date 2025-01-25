-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2024 at 07:37 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kaiyinkalaigal`
--

-- --------------------------------------------------------

--
-- Table structure for table `add_to_cart`
--

CREATE TABLE `add_to_cart` (
  `cart_id` int(100) NOT NULL,
  `seller` varchar(100) COLLATE utf8_bin NOT NULL,
  `status` varchar(100) COLLATE utf8_bin NOT NULL,
  `order_status` varchar(100) COLLATE utf8_bin NOT NULL,
  `shipping` varchar(100) COLLATE utf8_bin NOT NULL,
  `tracking` varchar(100) COLLATE utf8_bin NOT NULL,
  `customer_id` varchar(100) COLLATE utf8_bin NOT NULL,
  `product_id` varchar(100) COLLATE utf8_bin NOT NULL,
  `pname` varchar(100) COLLATE utf8_bin NOT NULL,
  `pimage` varchar(200) COLLATE utf8_bin NOT NULL,
  `description` varchar(1000) COLLATE utf8_bin NOT NULL,
  `quantity` varchar(10) COLLATE utf8_bin NOT NULL,
  `grand_total` varchar(100) COLLATE utf8_bin NOT NULL,
  `tax_amount` varchar(10) COLLATE utf8_bin NOT NULL,
  `shipping_charge` varchar(100) COLLATE utf8_bin NOT NULL,
  `net_total` varchar(100) COLLATE utf8_bin NOT NULL,
  `field_1` varchar(100) COLLATE utf8_bin NOT NULL,
  `created_date` varchar(100) COLLATE utf8_bin NOT NULL,
  `updated_date` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `add_to_cart`
--

INSERT INTO `add_to_cart` (`cart_id`, `seller`, `status`, `order_status`, `shipping`, `tracking`, `customer_id`, `product_id`, `pname`, `pimage`, `description`, `quantity`, `grand_total`, `tax_amount`, `shipping_charge`, `net_total`, `field_1`, `created_date`, `updated_date`) VALUES
(1, 'seller@gmail.com', 'Processing', 'Confirmed', '', '', '4', '9', 'Pottery', 'http://10.0.2.2/projects/kaiyinkalaigal/web/uploads/Pottery.png', 'Pottery', '1', '50', '0', '50', '100', '', '2024-06-12', '');

-- --------------------------------------------------------

--
-- Table structure for table `admin_details`
--

CREATE TABLE `admin_details` (
  `admin_id` int(100) NOT NULL,
  `fname` text COLLATE utf8_bin NOT NULL,
  `lname` text COLLATE utf8_bin NOT NULL,
  `email` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(10) COLLATE utf8_bin NOT NULL,
  `mobile` varchar(10) COLLATE utf8_bin NOT NULL,
  `otp` varchar(10) COLLATE utf8_bin NOT NULL,
  `success` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `admin_details`
--

INSERT INTO `admin_details` (`admin_id`, `fname`, `lname`, `email`, `password`, `mobile`, `otp`, `success`) VALUES
(11, 'admin', 'admin', 'admin@gmail.com', 'test', '1234567890', '51116', 1);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `cus_id` int(255) NOT NULL,
  `email` varchar(100) COLLATE utf8_bin NOT NULL,
  `field_1` varchar(100) COLLATE utf8_bin NOT NULL,
  `field_2` varchar(100) COLLATE utf8_bin NOT NULL,
  `field_3` varchar(100) COLLATE utf8_bin NOT NULL,
  `created_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`cus_id`, `email`, `field_1`, `field_2`, `field_3`, `created_date`) VALUES
(1, 'seller@gmail.com', 'Pottery', 'http://10.0.2.2/projects/kaiyinkalaigal/web/uploads/Pottery.png', '', '2022-03-31'),
(2, 'seller@gmail.com', 'Silk', 'http://10.0.2.2/projects/kaiyinkalaigal/web/uploads/58a.png', '', '2022-03-31'),
(3, 'seller@gmail.com', 'Painting', 'http://10.0.2.2/projects/kaiyinkalaigal/web/uploads/image_912.jpeg', '', '2022-03-31'),
(4, 'seller@gmail.com', 'Wooden', 'http://10.0.2.2/projects/kaiyinkalaigal/web/uploads/hlb361.png', '', '2022-03-31'),
(6, 'seller@gmail.com', 'Jewellery', 'http://10.0.2.2/projects/kaiyinkalaigal/web/uploads/jewel.png', '', '2022-03-31'),
(7, 'seller@gmail.com', 'Stone', 'http://10.0.2.2/projects/kaiyinkalaigal/web/uploads/1443432202DPD-6502.jpg', '', '2023-09-20');

-- --------------------------------------------------------

--
-- Table structure for table `customer_address`
--

CREATE TABLE `customer_address` (
  `address_id` int(100) NOT NULL,
  `customer_id` varchar(10) COLLATE utf8_bin NOT NULL,
  `street` varchar(100) COLLATE utf8_bin NOT NULL,
  `landmark` varchar(100) COLLATE utf8_bin NOT NULL,
  `city` varchar(100) COLLATE utf8_bin NOT NULL,
  `state` varchar(100) COLLATE utf8_bin NOT NULL,
  `pincode` varchar(100) COLLATE utf8_bin NOT NULL,
  `country` varchar(100) COLLATE utf8_bin NOT NULL,
  `mobile` varchar(100) COLLATE utf8_bin NOT NULL,
  `address_type` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `customer_address`
--

INSERT INTO `customer_address` (`address_id`, `customer_id`, `street`, `landmark`, `city`, `state`, `pincode`, `country`, `mobile`, `address_type`) VALUES
(1, '1', '18th, north street,', 'kovil', 'mumbai', 'maha', '612001', 'india', '1234567890', 'shipping'),
(2, '2', '18th, north street,', 'agarwal eye hospital', 'tanjore', 'tamilnadu', '612001', 'india', '963852741', 'shipping'),
(9, '31', 'Nagpur road', 'near park', 'nagpur', 'tamil nadu', '612001', 'india', '1234567890', 'Wallet'),
(10, '4', 'Brindavan', 'chamundeshwari nagar', 'Bangalore', 'Karnakata', '600023', 'India', '1235467890', 'Wallet');

-- --------------------------------------------------------

--
-- Table structure for table `customer_details`
--

CREATE TABLE `customer_details` (
  `customer_id` int(100) NOT NULL,
  `fname` varchar(100) COLLATE utf8_bin NOT NULL,
  `lname` varchar(100) COLLATE utf8_bin NOT NULL,
  `email` varchar(100) COLLATE utf8_bin NOT NULL,
  `password` varchar(100) COLLATE utf8_bin NOT NULL,
  `mobile` varchar(100) COLLATE utf8_bin NOT NULL,
  `created_date` varchar(100) COLLATE utf8_bin NOT NULL,
  `updated_date` varchar(100) COLLATE utf8_bin NOT NULL,
  `field_3` varchar(100) COLLATE utf8_bin NOT NULL,
  `otp` varchar(10) COLLATE utf8_bin NOT NULL,
  `success` int(10) NOT NULL,
  `field_1` varchar(100) COLLATE utf8_bin NOT NULL,
  `field_2` varchar(100) COLLATE utf8_bin NOT NULL,
  `field_9` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `customer_details`
--

INSERT INTO `customer_details` (`customer_id`, `fname`, `lname`, `email`, `password`, `mobile`, `created_date`, `updated_date`, `field_3`, `otp`, `success`, `field_1`, `field_2`, `field_9`) VALUES
(4, 'user', 'user', 'user@gmail.com', 'test', '1234567890', '2021-05-11', '', '4540', '73155', 1, 'buyer', '', 'Approved'),
(29, 'kaiyin', 'kalaigal ', 'seller@gmail.com', 'test', '1234567890', '2021-10-29', '', '', '77703', 1, 'vendor', '12345678901', 'Approved'),
(33, 'admin', 'admin', 'admin@gmail.com', 'test', '1234567890', '2021-05-11', '', '', '73155', 1, 'master', '', 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `cus_id` int(255) NOT NULL,
  `email` varchar(100) COLLATE utf8_bin NOT NULL,
  `field_1` varchar(100) COLLATE utf8_bin NOT NULL,
  `field_2` varchar(100) COLLATE utf8_bin NOT NULL,
  `field_3` varchar(100) COLLATE utf8_bin NOT NULL,
  `created_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`cus_id`, `email`, `field_1`, `field_2`, `field_3`, `created_date`) VALUES
(6, 'user@gmail.com', 'Selvam', 'Thanks', '3', '2023-09-20');

-- --------------------------------------------------------

--
-- Table structure for table `product_list`
--

CREATE TABLE `product_list` (
  `product_id` int(100) NOT NULL,
  `email` varchar(100) COLLATE utf8_bin NOT NULL,
  `pname` varchar(1000) COLLATE utf8_bin NOT NULL,
  `pimage` varchar(255) COLLATE utf8_bin NOT NULL,
  `description` varchar(1000) COLLATE utf8_bin NOT NULL,
  `price` varchar(1000) COLLATE utf8_bin NOT NULL,
  `discount` varchar(100) COLLATE utf8_bin NOT NULL,
  `offer` varchar(100) COLLATE utf8_bin NOT NULL,
  `size` varchar(100) COLLATE utf8_bin NOT NULL,
  `stock` varchar(100) COLLATE utf8_bin NOT NULL,
  `specification` varchar(1000) COLLATE utf8_bin NOT NULL,
  `shipping_days` varchar(100) COLLATE utf8_bin NOT NULL,
  `shipping_charge` varchar(100) COLLATE utf8_bin NOT NULL,
  `tax_amount` varchar(100) COLLATE utf8_bin NOT NULL,
  `category_name` varchar(100) COLLATE utf8_bin NOT NULL,
  `category1` varchar(100) COLLATE utf8_bin NOT NULL,
  `category2` varchar(100) COLLATE utf8_bin NOT NULL,
  `category3` varchar(100) COLLATE utf8_bin NOT NULL,
  `category4` varchar(100) COLLATE utf8_bin NOT NULL,
  `created_date` varchar(100) COLLATE utf8_bin NOT NULL,
  `updated_date` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `product_list`
--

INSERT INTO `product_list` (`product_id`, `email`, `pname`, `pimage`, `description`, `price`, `discount`, `offer`, `size`, `stock`, `specification`, `shipping_days`, `shipping_charge`, `tax_amount`, `category_name`, `category1`, `category2`, `category3`, `category4`, `created_date`, `updated_date`) VALUES
(3, 'seller@gmail.com', 'Jewellery', 'http://10.0.2.2/projects/kaiyinkalaigal/web/uploads/jewel.png', 'Jewellery', '350', 'Nil', '', '50 g', '1', '5 Pieces', '5', '10', '0', 'Jewellery', '', '1234567890', 'Chennai', '', '2022-Mar-Thu', ''),
(4, 'seller@gmail.com', 'Wooden', 'http://10.0.2.2/projects/kaiyinkalaigal/web/uploads/hlb361.png', 'Wooden', '2500', 'Nil', '', '5 kg', '1', 'Wooden', '2', '5', '0', 'Wooden', '', '1234568790', 'Bangalore', '', '2022-Mar-Thu', ''),
(5, 'seller@gmail.com', 'Stone', 'http://10.0.2.2/projects/kaiyinkalaigal/web/uploads/1443432202DPD-6502.jpg', 'Stone', '50', 'Nil', '', '100 gm', '1', 'Stone', '1', '5', '0', 'Stone', '', '1234567890', 'Chennai', '', '2022-Apr-Fri', ''),
(6, 'seller@gmail.com', 'Painting', 'http://10.0.2.2/projects/kaiyinkalaigal/web/uploads/image_912.jpeg', 'Painting', '4500', 'Nil', '', '100 CM', '1', 'Painting', '1', '5', '0', 'Painting', '', '1234567890', 'Chennai', '', '2022-Apr-Fri', ''),
(8, 'seller@gmail.com', 'Silk', 'http://10.0.2.2/projects/kaiyinkalaigal/web/uploads/58a.png', 'Silk', '500', 'Nil', '', '1 M', '1', 'Silk', '1', '5', '0', 'Silk', '', '1234567890', 'Chennai', '', '2023-Sep-Wed', ''),
(9, 'seller@gmail.com', 'Pottery', 'http://10.0.2.2/projects/kaiyinkalaigal/web/uploads/Pottery.png', 'Pottery', '50', 'Nil', '', '30 cm', '1', 'Pottery', '1', '50', '0', 'Pottery', '', '1234567890', 'Chennai', '', '2023-Sep-Thu', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_to_cart`
--
ALTER TABLE `add_to_cart`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `admin_details`
--
ALTER TABLE `admin_details`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cus_id`);

--
-- Indexes for table `customer_address`
--
ALTER TABLE `customer_address`
  ADD PRIMARY KEY (`address_id`);

--
-- Indexes for table `customer_details`
--
ALTER TABLE `customer_details`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`cus_id`);

--
-- Indexes for table `product_list`
--
ALTER TABLE `product_list`
  ADD PRIMARY KEY (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `add_to_cart`
--
ALTER TABLE `add_to_cart`
  MODIFY `cart_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `admin_details`
--
ALTER TABLE `admin_details`
  MODIFY `admin_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `cus_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `customer_address`
--
ALTER TABLE `customer_address`
  MODIFY `address_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `customer_details`
--
ALTER TABLE `customer_details`
  MODIFY `customer_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `cus_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `product_list`
--
ALTER TABLE `product_list`
  MODIFY `product_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
