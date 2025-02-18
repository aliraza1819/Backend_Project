export const baseRepository = (model) => ({
    findAll: async (filter = {}) => model.find(filter),
    findById: async (id) => model.findById(id),
    create: async (data) => model.create(data),
    update: async (id, data) => model.findByIdAndUpdate(id, data, { new: true }),
    delete: async (id) => model.findByIdAndDelete(id),
  });
 
  