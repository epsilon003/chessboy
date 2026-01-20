// Input validation utilities

export const validateFEN = (fen) => {
  if (!fen || typeof fen !== 'string') {
    return { valid: false, error: 'FEN must be a non-empty string' };
  }

  const parts = fen.trim().split('/');
  if (parts.length !== 8) {
    return { valid: false, error: 'FEN must have 8 ranks separated by /' };
  }

  for (let i = 0; i < parts.length; i++) {
    let count = 0;
    for (let char of parts[i]) {
      if (isNaN(char)) {
        if (!'rnbqkpRNBQKP'.includes(char)) {
          return { valid: false, error: `Invalid piece character '${char}' in rank ${i + 1}` };
        }
        count++;
      } else {
        const num = parseInt(char);
        if (num < 1 || num > 8) {
          return { valid: false, error: `Invalid empty square count '${char}' in rank ${i + 1}` };
        }
        count += num;
      }
    }
    if (count !== 8) {
      return { valid: false, error: `Rank ${i + 1} has ${count} squares instead of 8` };
    }
  }

  return { valid: true };
};

export const validatePGN = (pgn) => {
  if (!pgn || typeof pgn !== 'string') {
    return { valid: false, error: 'PGN must be a non-empty string' };
  }

  // Basic PGN validation - check for at least one move
  const movePattern = /\d+\.\s*[a-h1-8NBRQKx+#=O-]+/;
  if (!movePattern.test(pgn)) {
    return { valid: false, error: 'PGN must contain at least one valid move' };
  }

  return { valid: true };
};

export const validateGameName = (name) => {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Game name is required' };
  }

  const trimmed = name.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'Game name cannot be empty' };
  }

  if (trimmed.length > 100) {
    return { valid: false, error: 'Game name must be less than 100 characters' };
  }

  return { valid: true, value: trimmed };
};

export const validateImageFile = (file) => {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'File must be a JPEG, PNG, or GIF image' };
  }

  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 10MB' };
  }

  return { valid: true };
};