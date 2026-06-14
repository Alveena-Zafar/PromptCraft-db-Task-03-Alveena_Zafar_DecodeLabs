-- =====================================================
-- PromptCraft AI — Database Schema
-- Oracle Database 19c
-- Run this script before starting the server
-- =====================================================

-- Drop tables if they exist (clean start)
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE contacts';
   EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE prompts';
   EXCEPTION WHEN OTHERS THEN NULL;
END;
/

-- Create prompts table
CREATE TABLE prompts (
    id          NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category    VARCHAR2(50)    NOT NULL,
    difficulty  VARCHAR2(20)    NOT NULL,
    prompt_text CLOB            NOT NULL,
    CONSTRAINT chk_category  CHECK (category IN ('study','coding','writing','business')),
    CONSTRAINT chk_difficulty CHECK (difficulty IN ('beginner','intermediate','advanced'))
);

-- Create contacts table
CREATE TABLE contacts (
    id          NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name        VARCHAR2(100)   NOT NULL,
    email       VARCHAR2(150)   NOT NULL,
    message     CLOB            NOT NULL,
    created_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample prompts data
INSERT INTO prompts (category, difficulty, prompt_text) VALUES ('study', 'beginner', 'Explain the concept of variables using simple examples.');
INSERT INTO prompts (category, difficulty, prompt_text) VALUES ('study', 'intermediate', 'Create a 7-day study plan for Data Structures.');
INSERT INTO prompts (category, difficulty, prompt_text) VALUES ('study', 'advanced', 'Analyze the impact of AI on modern education.');
INSERT INTO prompts (category, difficulty, prompt_text) VALUES ('coding', 'beginner', 'Write a Java program to calculate area of a rectangle.');
INSERT INTO prompts (category, difficulty, prompt_text) VALUES ('coding', 'intermediate', 'Build a student record app using OOP concepts.');
INSERT INTO prompts (category, difficulty, prompt_text) VALUES ('coding', 'advanced', 'Design a scalable REST API with authentication.');
INSERT INTO prompts (category, difficulty, prompt_text) VALUES ('writing', 'beginner', 'Write a short paragraph about your favorite hobby.');
INSERT INTO prompts (category, difficulty, prompt_text) VALUES ('writing', 'intermediate', 'Draft a professional internship request email.');
INSERT INTO prompts (category, difficulty, prompt_text) VALUES ('writing', 'advanced', 'Write a persuasive article on the future of AI.');
INSERT INTO prompts (category, difficulty, prompt_text) VALUES ('business', 'beginner', 'Create a simple business idea for a local startup.');
INSERT INTO prompts (category, difficulty, prompt_text) VALUES ('business', 'intermediate', 'Develop a marketing strategy for a mobile app.');
INSERT INTO prompts (category, difficulty, prompt_text) VALUES ('business', 'advanced', 'Prepare a business growth plan for international markets.');

COMMIT;