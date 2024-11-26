-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2024 at 10:16 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sisfoset`
--

-- --------------------------------------------------------

--
-- Table structure for table `akses`
--

CREATE TABLE `akses` (
  `idAkses` char(25) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status` enum('yes','no') NOT NULL,
  `idLevel` char(5) NOT NULL,
  `tglBuat` datetime NOT NULL,
  `tglUpdate` datetime NOT NULL,
  `idBuat` varchar(25) NOT NULL,
  `idUpdate` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `akses`
--

INSERT INTO `akses` (`idAkses`, `nama`, `username`, `password`, `status`, `idLevel`, `tglBuat`, `tglUpdate`, `idBuat`, `idUpdate`) VALUES
('Vlqddk_sk', 'Dev', 'Zidan', '$2b$10$TriaKOd5opf5xmiz2Btcw.Ui4J5TsV3xA2Dje.De6HPtPThI2TRwa', 'yes', 'q92R8', '2024-11-26 13:45:22', '2024-11-26 13:45:22', 'Vlqddk_sk', 'Vlqddk_sk');

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `idKategori` char(5) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `tglBuat` datetime NOT NULL,
  `tglUpdate` datetime NOT NULL,
  `idBuat` varchar(25) NOT NULL,
  `idUpdate` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `level`
--

CREATE TABLE `level` (
  `idLevel` char(5) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `tanggalBuat` datetime NOT NULL,
  `tanggalUpdate` datetime NOT NULL,
  `idBuat` varchar(25) DEFAULT NULL,
  `idUpdate` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `level`
--

INSERT INTO `level` (`idLevel`, `nama`, `tanggalBuat`, `tanggalUpdate`, `idBuat`, `idUpdate`) VALUES
('LyPiw', 'Petugas', '2024-11-26 14:23:39', '2024-11-26 14:40:25', 'Vlqddk_sk', 'Vlqddk_sk'),
('q92R8', 'Developer', '2024-11-26 13:25:49', '2024-11-26 13:25:49', 'Vlqddk_sk', 'Vlqddk_sk');

-- --------------------------------------------------------

--
-- Table structure for table `masteraset`
--

CREATE TABLE `masteraset` (
  `idMasteraset` char(25) NOT NULL,
  `tipe` varchar(50) NOT NULL,
  `spesifikasi` text NOT NULL,
  `deskripsi` text NOT NULL,
  `idKategori` char(5) NOT NULL,
  `idMerk` char(5) NOT NULL,
  `tglBuat` datetime NOT NULL,
  `tglUpdate` datetime NOT NULL,
  `idBuat` varchar(25) NOT NULL,
  `idUpdate` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merk`
--

CREATE TABLE `merk` (
  `idMerk` char(5) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `tglBuat` datetime NOT NULL,
  `tglUpdate` datetime NOT NULL,
  `idBuat` varchar(25) NOT NULL,
  `idUpdate` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pencatatan`
--

CREATE TABLE `pencatatan` (
  `idPencatatan` char(25) NOT NULL,
  `idMasteraset` char(25) NOT NULL,
  `idPerolehan` char(25) NOT NULL,
  `harga` double NOT NULL,
  `tglPerolehan` date NOT NULL,
  `keterangan` text NOT NULL,
  `status` enum('yes','no') NOT NULL,
  `tglBuat` datetime NOT NULL,
  `tglUpdate` datetime NOT NULL,
  `idBuat` varchar(25) NOT NULL,
  `idUpdate` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `perolehan`
--

CREATE TABLE `perolehan` (
  `idPerolehan` char(25) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `keterangan` text NOT NULL,
  `tanggalBuat` datetime NOT NULL,
  `tanggalUpdate` datetime NOT NULL,
  `idBuat` varchar(25) NOT NULL,
  `idUpdate` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `riwayat`
--

CREATE TABLE `riwayat` (
  `idRiwayat` char(25) NOT NULL,
  `idPencatatan` char(25) NOT NULL,
  `kondisi` enum('baik','rusak ringan','rusak berat','hilang') NOT NULL,
  `idRuang` char(25) NOT NULL,
  `tglAudit` datetime NOT NULL,
  `tglBuat` datetime NOT NULL,
  `tglUpdate` datetime NOT NULL,
  `idBuat` varchar(25) NOT NULL,
  `idUpdate` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ruang`
--

CREATE TABLE `ruang` (
  `idRuang` char(25) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `idUnit` char(25) NOT NULL,
  `tglBuat` datetime NOT NULL,
  `tglUpdate` datetime NOT NULL,
  `idBuat` varchar(25) NOT NULL,
  `idUpdate` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `unit`
--

CREATE TABLE `unit` (
  `idUnit` char(25) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `tglBuat` datetime NOT NULL,
  `tglUpdate` datetime NOT NULL,
  `idBuat` varchar(25) NOT NULL,
  `idUpdate` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `akses`
--
ALTER TABLE `akses`
  ADD PRIMARY KEY (`idAkses`),
  ADD KEY `idLevel` (`idLevel`),
  ADD KEY `idBuat` (`idBuat`),
  ADD KEY `idUpdate` (`idUpdate`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`idKategori`),
  ADD KEY `idBuat` (`idBuat`),
  ADD KEY `idUpdate` (`idUpdate`);

--
-- Indexes for table `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`idLevel`),
  ADD KEY `idBuat` (`idBuat`),
  ADD KEY `idUpdate` (`idUpdate`);

--
-- Indexes for table `masteraset`
--
ALTER TABLE `masteraset`
  ADD PRIMARY KEY (`idMasteraset`),
  ADD KEY `idKategori` (`idKategori`),
  ADD KEY `idMerk` (`idMerk`),
  ADD KEY `idBuat` (`idBuat`),
  ADD KEY `idUpdate` (`idUpdate`);

--
-- Indexes for table `merk`
--
ALTER TABLE `merk`
  ADD PRIMARY KEY (`idMerk`),
  ADD KEY `idBuat` (`idBuat`),
  ADD KEY `idUpdate` (`idUpdate`);

--
-- Indexes for table `pencatatan`
--
ALTER TABLE `pencatatan`
  ADD PRIMARY KEY (`idPencatatan`),
  ADD KEY `idmAset` (`idMasteraset`),
  ADD KEY `idPerolehan` (`idPerolehan`),
  ADD KEY `idBuat` (`idBuat`),
  ADD KEY `idUpdate` (`idUpdate`);

--
-- Indexes for table `perolehan`
--
ALTER TABLE `perolehan`
  ADD PRIMARY KEY (`idPerolehan`),
  ADD KEY `idBuat` (`idBuat`),
  ADD KEY `idUpdate` (`idUpdate`);

--
-- Indexes for table `riwayat`
--
ALTER TABLE `riwayat`
  ADD PRIMARY KEY (`idRiwayat`),
  ADD KEY `idPencatatan` (`idPencatatan`),
  ADD KEY `idRuang` (`idRuang`),
  ADD KEY `idBuat` (`idBuat`),
  ADD KEY `idUpdate` (`idUpdate`);

--
-- Indexes for table `ruang`
--
ALTER TABLE `ruang`
  ADD PRIMARY KEY (`idRuang`),
  ADD KEY `idUnit` (`idUnit`),
  ADD KEY `idBuat` (`idBuat`),
  ADD KEY `idUpdate` (`idUpdate`);

--
-- Indexes for table `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`idUnit`),
  ADD KEY `idBuat` (`idBuat`),
  ADD KEY `idUpdate` (`idUpdate`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `akses`
--
ALTER TABLE `akses`
  ADD CONSTRAINT `akses_ibfk_1` FOREIGN KEY (`idLevel`) REFERENCES `level` (`idLevel`),
  ADD CONSTRAINT `akses_ibfk_2` FOREIGN KEY (`idBuat`) REFERENCES `akses` (`idAkses`),
  ADD CONSTRAINT `akses_ibfk_3` FOREIGN KEY (`idUpdate`) REFERENCES `akses` (`idAkses`);

--
-- Constraints for table `kategori`
--
ALTER TABLE `kategori`
  ADD CONSTRAINT `kategori_ibfk_1` FOREIGN KEY (`idBuat`) REFERENCES `akses` (`idAkses`),
  ADD CONSTRAINT `kategori_ibfk_2` FOREIGN KEY (`idUpdate`) REFERENCES `akses` (`idAkses`);

--
-- Constraints for table `level`
--
ALTER TABLE `level`
  ADD CONSTRAINT `level_ibfk_1` FOREIGN KEY (`idBuat`) REFERENCES `akses` (`idAkses`),
  ADD CONSTRAINT `level_ibfk_2` FOREIGN KEY (`idUpdate`) REFERENCES `akses` (`idAkses`);

--
-- Constraints for table `masteraset`
--
ALTER TABLE `masteraset`
  ADD CONSTRAINT `masteraset_ibfk_1` FOREIGN KEY (`idKategori`) REFERENCES `kategori` (`idKategori`),
  ADD CONSTRAINT `masteraset_ibfk_2` FOREIGN KEY (`idMerk`) REFERENCES `merk` (`idMerk`),
  ADD CONSTRAINT `masteraset_ibfk_3` FOREIGN KEY (`idBuat`) REFERENCES `akses` (`idAkses`),
  ADD CONSTRAINT `masteraset_ibfk_4` FOREIGN KEY (`idUpdate`) REFERENCES `akses` (`idAkses`);

--
-- Constraints for table `merk`
--
ALTER TABLE `merk`
  ADD CONSTRAINT `merk_ibfk_1` FOREIGN KEY (`idBuat`) REFERENCES `akses` (`idAkses`),
  ADD CONSTRAINT `merk_ibfk_2` FOREIGN KEY (`idUpdate`) REFERENCES `akses` (`idAkses`);

--
-- Constraints for table `pencatatan`
--
ALTER TABLE `pencatatan`
  ADD CONSTRAINT `pencatatan_ibfk_1` FOREIGN KEY (`idMasteraset`) REFERENCES `masteraset` (`idMasteraset`),
  ADD CONSTRAINT `pencatatan_ibfk_2` FOREIGN KEY (`idPerolehan`) REFERENCES `perolehan` (`idPerolehan`),
  ADD CONSTRAINT `pencatatan_ibfk_3` FOREIGN KEY (`idBuat`) REFERENCES `akses` (`idAkses`),
  ADD CONSTRAINT `pencatatan_ibfk_4` FOREIGN KEY (`idUpdate`) REFERENCES `akses` (`idAkses`);

--
-- Constraints for table `perolehan`
--
ALTER TABLE `perolehan`
  ADD CONSTRAINT `perolehan_ibfk_1` FOREIGN KEY (`idBuat`) REFERENCES `akses` (`idAkses`),
  ADD CONSTRAINT `perolehan_ibfk_2` FOREIGN KEY (`idUpdate`) REFERENCES `akses` (`idAkses`);

--
-- Constraints for table `riwayat`
--
ALTER TABLE `riwayat`
  ADD CONSTRAINT `riwayat_ibfk_1` FOREIGN KEY (`idPencatatan`) REFERENCES `pencatatan` (`idPencatatan`),
  ADD CONSTRAINT `riwayat_ibfk_2` FOREIGN KEY (`idRuang`) REFERENCES `ruang` (`idRuang`),
  ADD CONSTRAINT `riwayat_ibfk_3` FOREIGN KEY (`idBuat`) REFERENCES `akses` (`idAkses`),
  ADD CONSTRAINT `riwayat_ibfk_4` FOREIGN KEY (`idUpdate`) REFERENCES `akses` (`idAkses`);

--
-- Constraints for table `ruang`
--
ALTER TABLE `ruang`
  ADD CONSTRAINT `ruang_ibfk_1` FOREIGN KEY (`idUnit`) REFERENCES `unit` (`idUnit`),
  ADD CONSTRAINT `ruang_ibfk_2` FOREIGN KEY (`idBuat`) REFERENCES `akses` (`idAkses`),
  ADD CONSTRAINT `ruang_ibfk_3` FOREIGN KEY (`idUpdate`) REFERENCES `akses` (`idAkses`);

--
-- Constraints for table `unit`
--
ALTER TABLE `unit`
  ADD CONSTRAINT `unit_ibfk_1` FOREIGN KEY (`idBuat`) REFERENCES `akses` (`idAkses`),
  ADD CONSTRAINT `unit_ibfk_2` FOREIGN KEY (`idUpdate`) REFERENCES `akses` (`idAkses`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
