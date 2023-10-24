const 
const app = require('../../server.js'); 

describe('Book Routes', () => {
  // Test GET /books route
  describe('GET /books', () => {
    it('should return a list of books', async () => {
      const response = await request(app).get('/books');
      expect(response.status).toBe(200);
    });
  });

  // Test GET /books/:id route
  describe('GET /books/:id', () => {
    it('should return a specific book', async () => {
      const bookId = 1; // Replace with a valid book ID
      const response = await request(app).get(`/books/${bookId}`);
      expect(response.status).toBe(200);
    });
  });

  // Test POST /books route
  describe('POST /books', () => {
    it('should create a new book', async () => {
      const newBook = {
        title: 'Sample Book',
        author: 'Sample Author',
      };
      const response = await request(app).post('/books').send(newBook);
      expect(response.status).toBe(201);
    });
  });

  // Test PUT /books/:id route
  describe('PUT /books/:id', () => {
    it('should update a book', async () => {
      const bookId = 1; 
      const updatedBook = {
        title: 'Updated Book Title',
      };
      const response = await request(app).put(`/books/${bookId}`).send(updatedBook);
      expect(response.status).toBe(200);

    });
  });

  // Test DELETE /books/:id route
  describe('DELETE /books/:id', () => {
    it('should delete a book', async () => {
      const bookId = 1; 
      const response = await request(app).delete(`/books/${bookId}`);
      expect(response.status).toBe(204);

    });
  });
});
