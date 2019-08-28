SELECT c.author, c.text, c.score
FROM comments AS c
  INNER JOIN
  (
    SELECT author, MIN(score) AS MinPoint
    FROM comments
    GROUP BY author
  ) AS t
  ON c.author = t.author
WHERE t.MinPoint = c.score
ORDER BY c.score ASC