const express = require('express');
const router = express.Router();
const siteController = require('../Controller/SiteEngineerController');

// Routes for creating a new site
router.post('/sites', siteController.createSite);

// Routes for getting all sites
router.get('/sites', siteController.getAllSites);

// Routes for deleting a site
router.delete('/sites/:id', siteController.deleteSite);
router.post('/sites/:id', siteController.isCompletedmethod);

module.exports = router;
