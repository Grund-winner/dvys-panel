# Utiliser une image PHP officielle avec Apache
FROM php:8.2-apache

# Installer les extensions PHP nécessaires (CURL, MBSTRING, etc.)
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    pkg-config \
    libssl-dev \
    && docker-php-ext-install curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Activer le module Apache Rewrite (pour .htaccess)
RUN a2enmod rewrite

# Configurer le répertoire de travail
WORKDIR /var/www/html

# Copier tous les fichiers du projet vers le conteneur
COPY . /var/www/html/

# S'assurer que les permissions sont correctes pour Apache
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Créer les dossiers nécessaires s'ils n'existent pas (logs, progress)
RUN mkdir -p logs progress \
    && chown -R www-data:www-data logs progress

# Configurer Apache pour écouter sur le port fourni par Render ($PORT)
RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

# Exposer le port par défaut (Render le surchargera via la variable d'environnement)
EXPOSE 80

# Commande de démarrage
CMD ["apache2-foreground"]
