const errorHandler = (err, req, res, next) => {
  let statusCode = err.status || 500;
  let message = err.message || 'Erreur interne du serveur';

  // Gestion des erreurs spécifiques Mongoose
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  } else if (err.code === 11000) {
    statusCode = 400;
    message = 'Un enregistrement avec cette valeur existe déjà (doublon).';
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = `Format d'ID invalide : ${err.value}`;
  }

  res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;