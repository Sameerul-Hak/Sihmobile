const SiteModel = require('../Models/SiteEngineerModel'); // Assuming your model file path is correct

// Controller for creating a new site
exports.createSite = async (req, res) => {
  try {
    const { user } = req.body; // Assuming you're passing the user ID in the request body
    const newSite = await SiteModel.create({ user });
    res.status(201).json(newSite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for getting all sites
exports.getAllSites = async (req, res) => {
  try {
    const sites = await SiteModel.find().populate('user', 'name');
    // Populate 'user' with '_id' and 'username' fields
    res.status(200).json(sites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Controller for deleting a site
exports.deleteSite = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you pass the site ID in the request params
    const deletedSite = await SiteModel.findByIdAndDelete(id);
    if (!deletedSite) {
      return res.status(404).json({ error: 'Site not found' });
    }
    res.status(200).json(deletedSite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.isCompletedmethod = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSite = await SiteModel.findByIdAndUpdate(
      id,
      { isCompleted: true },
      { new: true } 
    );
    if (!updatedSite) {
      return res.status(404).json({ error: 'Site not found' });
    }
    
    res.status(200).json(updatedSite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};