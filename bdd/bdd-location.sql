-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 28 mai 2022 à 15:40
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bdd-location`
--

-- --------------------------------------------------------

--
-- Structure de la table `agence`
--

CREATE TABLE `agence` (
  `codeAgence` int(11) NOT NULL,
  `nomAgence` varchar(64) NOT NULL,
  `adresseAgence` varchar(64) NOT NULL,
  `villeAgence` varchar(64) NOT NULL,
  `teleFixAgence` varchar(64) NOT NULL,
  `iceAgence` varchar(64) NOT NULL,
  `paysAgence` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `agence`
--

INSERT INTO `agence` (`codeAgence`, `nomAgence`, `adresseAgence`, `villeAgence`, `teleFixAgence`, `iceAgence`, `paysAgence`) VALUES
(15, 'Mustapha SLIMANI', 'NR 05 RUE 07 AV ZENNOUHIA', 'JORF', '', '', 'maroc'),
(16, 'Car Rental', 'NR 05 AV 09 ALOUIFAK', 'RABAT', '', '', 'Maroc');

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `codeClient` int(11) NOT NULL,
  `nomClient` varchar(64) NOT NULL,
  `prenomClient` varchar(64) NOT NULL,
  `dateNaissanceClient` date NOT NULL,
  `lieuNaissanceClient` varchar(64) NOT NULL,
  `nationaliteClient` varchar(64) NOT NULL,
  `adresseClient` varchar(64) NOT NULL,
  `numTelClient` varchar(64) NOT NULL,
  `typeIdentiteClient` varchar(64) NOT NULL,
  `numPermisClient` varchar(64) NOT NULL,
  `identiteClient` varchar(255) NOT NULL,
  `sexeClient` varchar(255) NOT NULL,
  `emailClient` varchar(255) NOT NULL,
  `regionClient` varchar(255) NOT NULL,
  `villeClient` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`codeClient`, `nomClient`, `prenomClient`, `dateNaissanceClient`, `lieuNaissanceClient`, `nationaliteClient`, `adresseClient`, `numTelClient`, `typeIdentiteClient`, `numPermisClient`, `identiteClient`, `sexeClient`, `emailClient`, `regionClient`, `villeClient`) VALUES
(83, 'BENNANI', 'Imane', '2001-01-01', 'Pas encore definis', 'MAROCCAINE', 'NR 05 AV 08 EL WIFAK', '+2126327478', 'CIN', '293/2020', 'UC453423', 'femme', 'ben@gmail.com', 'RABAT', 'RABAT'),
(84, 'BENNANI', 'Mohamed', '1990-01-01', 'Pas encore definis', 'maroccain', 'NR 05 AV 09 RUE EL RIAD', '+2126327478', 'CIN', '3823/2018', 'UC454545', 'homme', 'med@gmail.com', 'rabat', 'rabat'),
(85, 'EL khaldi', 'Imane', '1995-01-01', 'Pas encore definis', 'MAROCCAINE', 'NR 05 RUE 07 AV EL riad', '+2126327478', 'Passe port', '223/2020', '431/2018', 'femme', 'khaldi@gmail.com', 'rabat', 'rabat');

-- --------------------------------------------------------

--
-- Structure de la table `contrat`
--

CREATE TABLE `contrat` (
  `codeContrat` int(11) NOT NULL,
  `dateDepartContrat` date NOT NULL,
  `dateRetourContrat` date NOT NULL,
  `codePersonnel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `contrat`
--

INSERT INTO `contrat` (`codeContrat`, `dateDepartContrat`, `dateRetourContrat`, `codePersonnel`) VALUES
(52, '2022-05-25', '2022-05-31', 11),
(53, '2022-05-25', '2022-06-03', 11),
(54, '2022-05-28', '2022-05-31', 12),
(55, '2022-05-28', '2022-06-04', 12),
(56, '2022-05-28', '2022-06-01', 12);

-- --------------------------------------------------------

--
-- Structure de la table `degat`
--

CREATE TABLE `degat` (
  `codeDegat` int(11) NOT NULL,
  `descriptionDegat` varchar(128) NOT NULL,
  `montantDegat` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `paiement`
--

CREATE TABLE `paiement` (
  `codePaiement` int(11) NOT NULL,
  `totalPaiement` varchar(64) NOT NULL,
  `avancePaiement` varchar(64) NOT NULL,
  `methodePaiement` varchar(64) NOT NULL,
  `etatPaiement` varchar(64) NOT NULL,
  `remarquePaiement` varchar(64) NOT NULL,
  `codeReservation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `paiement`
--

INSERT INTO `paiement` (`codePaiement`, `totalPaiement`, `avancePaiement`, `methodePaiement`, `etatPaiement`, `remarquePaiement`, `codeReservation`) VALUES
(48, '4200', '4200', 'Espéce', 'payé', '', 75),
(49, '9000', '9000', 'Espéce', 'payé', '', 76),
(50, '3000', '3000', 'Espéce', 'payé', '', 77),
(51, '2450', '2000', 'Espéce', '-450', '', 78),
(52, '28000', '28000', 'Espéce', 'payé', '', 79);

-- --------------------------------------------------------

--
-- Structure de la table `personnel`
--

CREATE TABLE `personnel` (
  `codePersonnel` int(11) NOT NULL,
  `nomPersonnel` varchar(64) NOT NULL,
  `prenomPersonnel` varchar(64) NOT NULL,
  `NCNSSPersonnel` varchar(64) NOT NULL,
  `servicePersonnel` varchar(64) NOT NULL,
  `dateEntrePersonnel` date NOT NULL,
  `salairePersonnel` varchar(64) NOT NULL,
  `codeAgence` int(11) NOT NULL,
  `portablePersonnel` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `personnel`
--

INSERT INTO `personnel` (`codePersonnel`, `nomPersonnel`, `prenomPersonnel`, `NCNSSPersonnel`, `servicePersonnel`, `dateEntrePersonnel`, `salairePersonnel`, `codeAgence`, `portablePersonnel`) VALUES
(11, 'SLIMANI', 'Mustapha', '', 'administrateur', '0000-00-00', '', 15, '+212681895383'),
(12, 'BENNANI', 'Ahmed', '', 'administrateur', '0000-00-00', '', 16, '+212600019233');

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `codeReservation` int(11) NOT NULL,
  `dateDepartReservation` date NOT NULL,
  `dateRetourReservation` date NOT NULL,
  `etatReservation` varchar(64) NOT NULL,
  `codeClient` int(11) NOT NULL,
  `codeVoiture` int(11) NOT NULL,
  `codeContrat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`codeReservation`, `dateDepartReservation`, `dateRetourReservation`, `etatReservation`, `codeClient`, `codeVoiture`, `codeContrat`) VALUES
(75, '2022-05-25', '2022-05-31', 'libre', 83, 18, 52),
(76, '2022-05-25', '2022-06-03', 'loué', 83, 19, 53),
(77, '2022-05-28', '2022-05-31', 'loué', 84, 24, 54),
(78, '2022-05-28', '2022-06-04', 'loué', 84, 23, 55),
(79, '2022-05-28', '2022-06-01', 'loué', 85, 26, 56);

-- --------------------------------------------------------

--
-- Structure de la table `retour`
--

CREATE TABLE `retour` (
  `codeRetour` int(11) NOT NULL,
  `dateEntreRetour` date NOT NULL,
  `etatRetour` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `suivie-technique`
--

CREATE TABLE `suivie-technique` (
  `codeSuivi` int(11) NOT NULL,
  `descriptionSuivi` varchar(128) NOT NULL,
  `dateSuivi` date NOT NULL,
  `codeVoiture` int(11) NOT NULL,
  `codePersonnel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `codeUtilisateur` int(11) NOT NULL,
  `emailUtilisateur` varchar(64) NOT NULL,
  `motDePasseUtilisateur` varchar(64) NOT NULL,
  `codePersonnel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`codeUtilisateur`, `emailUtilisateur`, `motDePasseUtilisateur`, `codePersonnel`) VALUES
(11, 'itsmustaphahere@gmail.com', 'password', 11),
(12, 'test@gmail.com', 'password', 12);

-- --------------------------------------------------------

--
-- Structure de la table `vidange`
--

CREATE TABLE `vidange` (
  `codeVidange` int(11) NOT NULL,
  `dureeVidange` int(11) NOT NULL,
  `dureeActuelVidange` int(11) NOT NULL,
  `prixVidange` float NOT NULL,
  `alertVidange` int(11) NOT NULL,
  `codeVoiture` int(11) NOT NULL,
  `dateVidange` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `vidange`
--

INSERT INTO `vidange` (`codeVidange`, `dureeVidange`, `dureeActuelVidange`, `prixVidange`, `alertVidange`, `codeVoiture`, `dateVidange`) VALUES
(1, 10000, 200, 750, 100, 19, '2022-05-27');

-- --------------------------------------------------------

--
-- Structure de la table `voiture`
--

CREATE TABLE `voiture` (
  `codeVoiture` int(11) NOT NULL,
  `immatriculationVoiture` varchar(64) NOT NULL,
  `marqueVoiture` varchar(64) NOT NULL,
  `modelVoiture` varchar(64) NOT NULL,
  `categorieVoiture` varchar(64) NOT NULL,
  `numPlaceVoiture` int(11) NOT NULL,
  `dateCirculaireVoiture` date NOT NULL,
  `numMoteurVoiture` varchar(64) NOT NULL,
  `etatVoiture` varchar(128) NOT NULL,
  `prixParJourVoiture` varchar(64) NOT NULL,
  `kilometrageVoiture` varchar(64) NOT NULL,
  `codeAgence` int(11) NOT NULL,
  `carburantVoiture` varchar(255) NOT NULL,
  `imagesVoiture` varchar(255) NOT NULL,
  `dateVignetteVoiture` date DEFAULT NULL,
  `alertVignetteVoiture` int(11) NOT NULL,
  `totalVignetteVoiture` int(11) NOT NULL,
  `kilometrageVidVoiture` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `voiture`
--

INSERT INTO `voiture` (`codeVoiture`, `immatriculationVoiture`, `marqueVoiture`, `modelVoiture`, `categorieVoiture`, `numPlaceVoiture`, `dateCirculaireVoiture`, `numMoteurVoiture`, `etatVoiture`, `prixParJourVoiture`, `kilometrageVoiture`, `codeAgence`, `carburantVoiture`, `imagesVoiture`, `dateVignetteVoiture`, `alertVignetteVoiture`, `totalVignetteVoiture`, `kilometrageVidVoiture`) VALUES
(18, '123534 A 25', 'audi', 'rsq8', '', 0, '2015-01-01', '', '', '800', '10000', 15, 'diesel', '', NULL, 0, 0, 0),
(19, '54235 A 25', 'audi', 'rs6', '', 0, '2015-01-25', '', '', '1200', '550', 15, 'diesel', '', NULL, 0, 0, 0),
(21, '4637 A 1', 'audi', 'rs3', '', 0, '2015-01-01', '', '', '350', '10000', 15, 'diesel', '', '2022-05-29', 2, 10000, 250),
(23, '1235334 A 25', 'audi', 'rs3', '', 0, '2015-01-01', '', '', '350', '10000', 16, 'diesel', '', '2023-01-01', 2, 10000, 250),
(24, '432 A 25', 'bmw', 'serie 6', '', 0, '2018-01-01', '', '', '1000', '10000', 16, 'diesel', '', '2023-01-01', 5, 20000, 200),
(25, '4521 A 1', 'Renault', 'megane', '', 0, '2015-01-01', '', '', '150', '10000', 16, 'diesel', '', '2023-01-01', 5, 5000, 150),
(26, '542355 A 25', 'Renault', 'kadjar', '', 0, '2015-01-01', '', '', '7000', '10000', 16, 'diesel', '', '2023-01-01', 5, 10000, 400),
(27, '542325 A 25', 'mercedes ', 'glc', '', 0, '2018-01-01', '', '', '600', '10000', 16, 'diesel', '', '2023-01-01', 5, 10000, 250);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `agence`
--
ALTER TABLE `agence`
  ADD PRIMARY KEY (`codeAgence`),
  ADD KEY `codeAgence` (`codeAgence`);

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`codeClient`),
  ADD KEY `codeClient` (`codeClient`);

--
-- Index pour la table `contrat`
--
ALTER TABLE `contrat`
  ADD PRIMARY KEY (`codeContrat`),
  ADD KEY `codePersonnel` (`codePersonnel`),
  ADD KEY `codeContrat` (`codeContrat`);

--
-- Index pour la table `degat`
--
ALTER TABLE `degat`
  ADD PRIMARY KEY (`codeDegat`);

--
-- Index pour la table `paiement`
--
ALTER TABLE `paiement`
  ADD PRIMARY KEY (`codePaiement`),
  ADD KEY `codeReservation` (`codeReservation`);

--
-- Index pour la table `personnel`
--
ALTER TABLE `personnel`
  ADD PRIMARY KEY (`codePersonnel`),
  ADD KEY `codePersonnel` (`codePersonnel`),
  ADD KEY `codeAgence` (`codeAgence`);

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`codeReservation`),
  ADD KEY `reservation_cllient` (`codeClient`),
  ADD KEY `reservation_voiture` (`codeVoiture`);

--
-- Index pour la table `suivie-technique`
--
ALTER TABLE `suivie-technique`
  ADD PRIMARY KEY (`codeSuivi`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`codeUtilisateur`),
  ADD KEY `utilisateur_personnel` (`codePersonnel`);

--
-- Index pour la table `vidange`
--
ALTER TABLE `vidange`
  ADD PRIMARY KEY (`codeVidange`);

--
-- Index pour la table `voiture`
--
ALTER TABLE `voiture`
  ADD PRIMARY KEY (`codeVoiture`),
  ADD UNIQUE KEY `immatriculationVoiture` (`immatriculationVoiture`),
  ADD KEY `codeVoiture` (`codeVoiture`),
  ADD KEY `voiture_agence` (`codeAgence`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `agence`
--
ALTER TABLE `agence`
  MODIFY `codeAgence` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `codeClient` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT pour la table `contrat`
--
ALTER TABLE `contrat`
  MODIFY `codeContrat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT pour la table `degat`
--
ALTER TABLE `degat`
  MODIFY `codeDegat` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `paiement`
--
ALTER TABLE `paiement`
  MODIFY `codePaiement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT pour la table `personnel`
--
ALTER TABLE `personnel`
  MODIFY `codePersonnel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `codeReservation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT pour la table `suivie-technique`
--
ALTER TABLE `suivie-technique`
  MODIFY `codeSuivi` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `codeUtilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `vidange`
--
ALTER TABLE `vidange`
  MODIFY `codeVidange` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `voiture`
--
ALTER TABLE `voiture`
  MODIFY `codeVoiture` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `contrat`
--
ALTER TABLE `contrat`
  ADD CONSTRAINT `codePersonnel` FOREIGN KEY (`codePersonnel`) REFERENCES `personnel` (`codePersonnel`);

--
-- Contraintes pour la table `paiement`
--
ALTER TABLE `paiement`
  ADD CONSTRAINT `paiement_reservation` FOREIGN KEY (`codeReservation`) REFERENCES `reservation` (`codeReservation`);

--
-- Contraintes pour la table `personnel`
--
ALTER TABLE `personnel`
  ADD CONSTRAINT `codeAgence` FOREIGN KEY (`codeAgence`) REFERENCES `agence` (`codeAgence`);

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_cllient` FOREIGN KEY (`codeClient`) REFERENCES `client` (`codeClient`),
  ADD CONSTRAINT `reservation_voiture` FOREIGN KEY (`codeVoiture`) REFERENCES `voiture` (`codeVoiture`);

--
-- Contraintes pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `utilisateur_personnel` FOREIGN KEY (`codePersonnel`) REFERENCES `personnel` (`codePersonnel`);

--
-- Contraintes pour la table `voiture`
--
ALTER TABLE `voiture`
  ADD CONSTRAINT `voiture_agence` FOREIGN KEY (`codeAgence`) REFERENCES `agence` (`codeAgence`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
