create table
  `todos` (
    `id` int unsigned not null auto_increment primary key,
    `title` varchar(255) null,
    `description` TEXT null,
    `created_at` timestamp not null default CURRENT_TIMESTAMP
  )
