SELECT t.todo_id, t.title, t.description FROM users AS u JOIN todos AS t ON u.user_id=t.user_id WHERE email='testuser@gmail.com';

 
(SELECT
    hash, user_id
    FROM users
    WHERE email='testuser@gmail.com'
)
UNION
(
    SELECT 
    todo_id, title, description
    FROM
    todos
    WHERE
    user_id=19
);

- testuser@gmail.com / 9999


 (SELECT
    name, games, goals
    FROM tblMadrid WHERE name = 'ronaldo')
 UNION
 (SELECT
    name, games, goals
    FROM tblBarcelona WHERE name = 'messi')
ORDER BY goals;