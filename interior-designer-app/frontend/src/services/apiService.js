import api from './api';

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/updatedetails', data),
  updatePassword: (data) => api.put('/auth/updatepassword', data),
};

export const productService = {
  getProducts: (params) => api.get('/products', { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

export const designerService = {
  getDesigners: (params) => api.get('/designers', { params }),
  getDesigner: (id) => api.get(`/designers/${id}`),
  getMyProfile: () => api.get('/designers/me'),
  updateProfile: (data) => api.post('/designers/profile', data),
  addPortfolio: (data) => api.post('/designers/portfolio', data),
  approveDesigner: (id) => api.put(`/designers/${id}/approve`),
};

export const bookingService = {
  createBooking: (data) => api.post('/bookings', data),
  getBookings: () => api.get('/bookings'),
  getBooking: (id) => api.get(`/bookings/${id}`),
  updateStatus: (id, status) => api.put(`/bookings/${id}/status`, { status }),
  addReview: (id, data) => api.post(`/bookings/${id}/review`, data),
  cancelBooking: (id, reason) => api.put(`/bookings/${id}/cancel`, { cancellationReason: reason }),
};

export const roomDesignService = {
  createDesign: (data) => api.post('/designs', data),
  getMyDesigns: () => api.get('/designs'),
  getDesign: (id) => api.get(`/designs/${id}`),
  updateDesign: (id, data) => api.put(`/designs/${id}`, data),
  deleteDesign: (id) => api.delete(`/designs/${id}`),
  getPublicDesigns: (params) => api.get('/designs/public', { params }),
  toggleLike: (id) => api.post(`/designs/${id}/like`),
};

export const orderService = {
  createOrder: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders'),
  getOrder: (id) => api.get(`/orders/${id}`),
  getAllOrders: (params) => api.get('/orders/all', { params }),
  updateOrderStatus: (id, data) => api.put(`/orders/${id}/status`, data),
  updatePaymentStatus: (id, data) => api.put(`/orders/${id}/payment`, data),
};
