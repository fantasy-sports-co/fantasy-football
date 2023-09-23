CREATE TABLE team (
    id UUID PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    country VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);