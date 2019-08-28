SELECT parent, id, time, by, text, score FROM comments
WHERE author = 'pg'
ORDER BY score ASC
LIMIT 100;