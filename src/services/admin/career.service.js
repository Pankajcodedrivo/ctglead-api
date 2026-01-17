const ApiError = require('../../helpers/apiErrorConverter');
const Career = require('../../models/career.model');
const mongoose = require('mongoose');

const getCareers = async (currentPage, limit, search) => {
  try {
    const sanitizedSearchTerm = search.replace(/"/g, '');
    let searchQuery = {};
    if (sanitizedSearchTerm && sanitizedSearchTerm !== '') {
      searchQuery = {
        careerName: {
          $regex: sanitizedSearchTerm,
          $options: 'i',
        },
      };
    }
    const totalItems = await Career.find(searchQuery).countDocuments();
    const Careers = await Career.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * limit)
      .limit(limit);

    const careerList = {
      Careers,
      page: currentPage,
      limit: limit,
      totalPages: Math.ceil(totalItems / limit),
      totalResults: totalItems,
    };

    return careerList;
  } catch (err) {
    if (err) {
      return new ApiError('404', 'Career not found');
    }
  }
};

const careerList = async () => {
  const careers = await Career.find();
  return careers
}

const addCareer = async (careerData) => {
  const career = await Career.create(careerData);
  return career;
};

const editCareer = async (id) => {
  try {
    const career = await Career.findById(id);
    return career;
  } catch (e) {
    throw new ApiError(e.message, 404);
  }
};

const updateCareer = async (id, data) => {
  return Career.findByIdAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    data,
    { new: true },
  );
};

const deleteCareer = async (id) => {
  try {
    await Career.findByIdAndDelete(id);
  } catch (e) {
    throw new ApiError(e.message, 404);
  }
};

// seach career
const searchCareer = async () => {
  try {
    const careerList = await Career.find().select('_id teamName');
    return careerList;
  } catch (err) {
    return new ApiError('404', 'Career not found');
  }
};

module.exports = {
  getCareers,
  addCareer,
  editCareer,
  updateCareer,
  deleteCareer,
  searchCareer,
  careerList
};
