# Modelagem do Banco de Dados - Zone 4 Dead

## Diagrama ER (Entity-Relationship)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ZONE 4 DEAD - BANCO DE DADOS                         │
│                                                                               │
│  ┌──────────────────────┐         ┌──────────────────────┐                  │
│  │      MOVIES          │         │      TV_SHOWS        │                  │
│  ├──────────────────────┤         ├──────────────────────┤                  │
│  │ PK: id (INT)         │         │ PK: id (INT)         │                  │
│  │    title (VARCHAR)   │         │    name (VARCHAR)    │                  │
│  │    poster_path (STR) │         │    poster_path (STR) │                  │
│  │    backdrop_path     │         │    backdrop_path     │                  │
│  │    overview (TEXT)   │         │    overview (TEXT)   │                  │
│  │    release_date      │         │    first_air_date    │                  │
│  │    vote_average      │         │    vote_average      │                  │
│  │    vote_count        │         │    vote_count        │                  │
│  │    genre_ids (ARR)   │         │    genre_ids (ARR)   │                  │
│  │    popularity (DEC)  │         │    popularity (DEC)  │                  │
│  │    original_language │         │    original_language │                  │
│  │    original_title    │         │    original_name     │                  │
│  │    video (BOOL)      │         │    origin_country    │                  │
│  │    adult (BOOL)      │         │    (ARR)             │                  │
│  └──────────────────────┘         └──────────────────────┘                  │
│           │                                 │                                │
│           │                                 │                                │
│           └──────────────┬──────────────────┘                                │
│                          │                                                   │
│                    M:N Relationship                                          │
│                   (genre_ids array)                                          │
│                          │                                                   │
│                          ▼                                                   │
│           ┌──────────────────────────┐                                       │
│           │      GENRES              │                                       │
│           ├──────────────────────────┤                                       │
│           │ PK: id (INT)             │                                       │
│           │    name (VARCHAR)        │                                       │
│           └──────────────────────────┘                                       │
│                                                                               │
│  ┌──────────────────────┐         ┌──────────────────────┐                  │
│  │    KEYWORDS          │         │  KEYWORD_GROUPS      │                  │
│  ├──────────────────────┤         ├──────────────────────┤                  │
│  │ PK: id (INT)         │  1:N    │ PK: id (VARCHAR)     │                  │
│  │    name (VARCHAR)    │◄────────│    name (VARCHAR)    │                  │
│  │    description       │         │    description       │                  │
│  │ FK: group_id         │         │    type (ENUM)       │                  │
│  └──────────────────────┘         └──────────────────────┘                  │
│           │                                                                  │
│           │                                                                  │
│           └──────────────┬──────────────────────┐                            │
│                          │                      │                            │
│                    M:N Relationship             │                            │
│                   (filter logic)                │                            │
│                          │                      │                            │
│        ┌─────────────────┴──────┬───────────────┘                            │
│        │                        │                                            │
│        ▼                        ▼                                            │
│  ┌──────────────────────────────────────────┐                               │
│  │   MOVIE_KEYWORDS / TV_KEYWORDS (M:N)     │                               │
│  ├──────────────────────────────────────────┤                               │
│  │ FK: media_id (INT)                       │                               │
│  │ FK: keyword_id (INT)                     │                               │
│  │ PK: (media_id, keyword_id)               │                               │
│  └──────────────────────────────────────────┘                               │
│                                                                               │
│  ┌──────────────────────┐         ┌──────────────────────┐                  │
│  │  SEARCH_HISTORY      │         │   USER_PREFERENCES   │                  │
│  ├──────────────────────┤         ├──────────────────────┤                  │
│  │ PK: id (INT)         │         │ PK: user_id (UUID)   │                  │
│  │    query (VARCHAR)   │         │    favorite_keywords │                  │
│  │    media_type (ENUM) │         │    search_history    │                  │
│  │    timestamp (DT)    │         │    watched_list      │                  │
│  │    result_count      │         │    created_at        │                  │
│  └──────────────────────┘         └──────────────────────┘                  │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Descrição das Entidades

### 1. **MOVIES** (Filmes)

Armazena dados dos filmes do TMDB.

| Campo               | Tipo          | Descrição                      |
| ------------------- | ------------- | ------------------------------ |
| `id`                | INT           | Identificador único do filme   |
| `title`             | VARCHAR(255)  | Título do filme                |
| `poster_path`       | VARCHAR(255)  | Caminho da imagem do pôster    |
| `backdrop_path`     | VARCHAR(255)  | Caminho da imagem de fundo     |
| `overview`          | TEXT          | Sinopse do filme               |
| `release_date`      | DATE          | Data de lançamento             |
| `vote_average`      | DECIMAL(3,1)  | Classificação média (0-10)     |
| `vote_count`        | INT           | Número de votos                |
| `genre_ids`         | JSON ARRAY    | IDs dos gêneros                |
| `popularity`        | DECIMAL(10,2) | Score de popularidade          |
| `original_language` | VARCHAR(5)    | Idioma original (ex: en, pt)   |
| `original_title`    | VARCHAR(255)  | Título original                |
| `video`             | BOOLEAN       | Se é vídeo                     |
| `adult`             | BOOLEAN       | Se é classificado para adultos |

**Índices:**

- `CREATE INDEX idx_movies_release_date ON movies(release_date);`
- `CREATE INDEX idx_movies_popularity ON movies(popularity);`
- `CREATE INDEX idx_movies_vote_average ON movies(vote_average);`

---

### 2. **TV_SHOWS** (Séries)

Armazena dados das séries do TMDB.

| Campo               | Tipo          | Descrição                    |
| ------------------- | ------------- | ---------------------------- |
| `id`                | INT           | Identificador único da série |
| `name`              | VARCHAR(255)  | Nome da série                |
| `poster_path`       | VARCHAR(255)  | Caminho da imagem do pôster  |
| `backdrop_path`     | VARCHAR(255)  | Caminho da imagem de fundo   |
| `overview`          | TEXT          | Sinopse da série             |
| `first_air_date`    | DATE          | Data de estreia              |
| `vote_average`      | DECIMAL(3,1)  | Classificação média (0-10)   |
| `vote_count`        | INT           | Número de votos              |
| `genre_ids`         | JSON ARRAY    | IDs dos gêneros              |
| `popularity`        | DECIMAL(10,2) | Score de popularidade        |
| `original_language` | VARCHAR(5)    | Idioma original              |
| `original_name`     | VARCHAR(255)  | Nome original                |
| `origin_country`    | JSON ARRAY    | Países de origem             |

**Índices:**

- `CREATE INDEX idx_tv_shows_first_air_date ON tv_shows(first_air_date);`
- `CREATE INDEX idx_tv_shows_popularity ON tv_shows(popularity);`
- `CREATE INDEX idx_tv_shows_vote_average ON tv_shows(vote_average);`

---

### 3. **GENRES** (Gêneros)

Armazena os gêneros de filmes e séries.

| Campo  | Tipo         | Descrição                                    |
| ------ | ------------ | -------------------------------------------- |
| `id`   | INT          | Identificador do gênero (TMDB)               |
| `name` | VARCHAR(100) | Nome do gênero (ex: Ação, Ficção Científica) |

**Índices:**

- `CREATE INDEX idx_genres_name ON genres(name);`

---

### 4. **KEYWORDS** (Palavras-chave)

Armazena keywords/tags para filtrar conteúdo zumbi.

| Campo         | Tipo         | Descrição                       |
| ------------- | ------------ | ------------------------------- |
| `id`          | INT          | Identificador da keyword (TMDB) |
| `name`        | VARCHAR(100) | Nome da keyword                 |
| `description` | TEXT         | Descrição (opcional)            |
| `group_id`    | VARCHAR(50)  | FK para KEYWORD_GROUPS          |

**Índices:**

- `CREATE INDEX idx_keywords_group_id ON keywords(group_id);`
- `CREATE INDEX idx_keywords_name ON keywords(name);`

---

### 5. **KEYWORD_GROUPS** (Grupos de Keywords)

Define grupos de palavras-chave para filtros temáticos.

| Campo         | Tipo         | Descrição                        |
| ------------- | ------------ | -------------------------------- |
| `id`          | VARCHAR(50)  | Identificador único do grupo     |
| `name`        | VARCHAR(100) | Nome do grupo (ex: "Apocalipse") |
| `description` | TEXT         | Descrição do grupo               |
| `type`        | ENUM         | Tipo: 'default' ou 'optional'    |

**Dados Padrão:**

```sql
INSERT INTO keyword_groups (id, name, type) VALUES
('default', 'Zumbis gerais', 'default'),
('apocalypse', 'Apocalipse', 'optional'),
('infection', 'Infecção / Vírus', 'optional'),
('undead', 'Mortos-vivos', 'optional'),
('animals', 'Animais zumbis', 'optional'),
('science', 'Ciência / Laboratório', 'optional'),
('necromancy', 'Magia / Necromancia', 'optional');
```

---

### 6. **MOVIE_KEYWORDS / TV_KEYWORDS** (Relação M:N)

Relaciona filmes/séries com suas keywords.

| Campo        | Tipo | Descrição                  |
| ------------ | ---- | -------------------------- |
| `media_id`   | INT  | FK para MOVIES ou TV_SHOWS |
| `keyword_id` | INT  | FK para KEYWORDS           |

**Chave Primária Composta:**

- `PRIMARY KEY (media_id, keyword_id)`

**Índices:**

- `CREATE INDEX idx_movie_keywords_keyword ON movie_keywords(keyword_id);`
- `CREATE INDEX idx_tv_keywords_keyword ON tv_keywords(keyword_id);`

---

### 7. **SEARCH_HISTORY** (Histórico de Busca)

Rastreia buscas realizadas pelos usuários.

| Campo          | Tipo         | Descrição                   |
| -------------- | ------------ | --------------------------- |
| `id`           | INT          | Identificador único         |
| `query`        | VARCHAR(255) | Texto de busca              |
| `media_type`   | ENUM         | 'movie', 'tv' ou 'all'      |
| `timestamp`    | DATETIME     | Quando foi buscado          |
| `result_count` | INT          | Quantos resultados retornou |

**Índices:**

- `CREATE INDEX idx_search_history_timestamp ON search_history(timestamp);`
- `CREATE INDEX idx_search_history_query ON search_history(query);`

---

### 8. **USER_PREFERENCES** (Preferências do Usuário)

Armazena preferências do usuário (para implementação futura).

| Campo               | Tipo       | Descrição                       |
| ------------------- | ---------- | ------------------------------- |
| `user_id`           | UUID       | Identificador único do usuário  |
| `favorite_keywords` | JSON ARRAY | Keywords favoritas do usuário   |
| `search_history`    | JSON ARRAY | Histórico de buscas recentes    |
| `watched_list`      | JSON ARRAY | IDs de filmes/séries assistidos |
| `created_at`        | DATETIME   | Data de criação                 |

---

## Relacionamentos

### M:N - MOVIES ↔ GENRES

- Um filme pode ter múltiplos gêneros
- Um gênero pode estar em múltiplos filmes
- Implementado via array JSON (`genre_ids`)

### M:N - TV_SHOWS ↔ GENRES

- Uma série pode ter múltiplos gêneros
- Um gênero pode estar em múltiplas séries
- Implementado via array JSON (`genre_ids`)

### 1:N - KEYWORD_GROUPS ↔ KEYWORDS

- Um grupo contém múltiplas keywords
- Cada keyword pertence a um grupo

### M:N - MOVIES ↔ KEYWORDS

- Um filme pode ter múltiplas keywords
- Uma keyword pode estar em múltiplos filmes
- Tabela de junção: `movie_keywords`

### M:N - TV_SHOWS ↔ KEYWORDS

- Uma série pode ter múltiplas keywords
- Uma keyword pode estar em múltiplas séries
- Tabela de junção: `tv_keywords`

---

## Scripts de Criação (SQL)

```sql
-- Tabela GENRES
CREATE TABLE genres (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela MOVIES
CREATE TABLE movies (
  id INT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  poster_path VARCHAR(255),
  backdrop_path VARCHAR(255),
  overview TEXT,
  release_date DATE,
  vote_average DECIMAL(3,1),
  vote_count INT,
  genre_ids JSON,
  popularity DECIMAL(10,2),
  original_language VARCHAR(5),
  original_title VARCHAR(255),
  video BOOLEAN,
  adult BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_movies_release_date (release_date),
  INDEX idx_movies_popularity (popularity),
  INDEX idx_movies_vote_average (vote_average)
);

-- Tabela TV_SHOWS
CREATE TABLE tv_shows (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  poster_path VARCHAR(255),
  backdrop_path VARCHAR(255),
  overview TEXT,
  first_air_date DATE,
  vote_average DECIMAL(3,1),
  vote_count INT,
  genre_ids JSON,
  popularity DECIMAL(10,2),
  original_language VARCHAR(5),
  original_name VARCHAR(255),
  origin_country JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_tv_shows_first_air_date (first_air_date),
  INDEX idx_tv_shows_popularity (popularity),
  INDEX idx_tv_shows_vote_average (vote_average)
);

-- Tabela KEYWORD_GROUPS
CREATE TABLE keyword_groups (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  type ENUM('default', 'optional') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela KEYWORDS
CREATE TABLE keywords (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  group_id VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES keyword_groups(id),
  INDEX idx_keywords_group_id (group_id),
  INDEX idx_keywords_name (name)
);

-- Tabela MOVIE_KEYWORDS
CREATE TABLE movie_keywords (
  media_id INT NOT NULL,
  keyword_id INT NOT NULL,
  PRIMARY KEY (media_id, keyword_id),
  FOREIGN KEY (media_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (keyword_id) REFERENCES keywords(id) ON DELETE CASCADE,
  INDEX idx_movie_keywords_keyword (keyword_id)
);

-- Tabela TV_KEYWORDS
CREATE TABLE tv_keywords (
  media_id INT NOT NULL,
  keyword_id INT NOT NULL,
  PRIMARY KEY (media_id, keyword_id),
  FOREIGN KEY (media_id) REFERENCES tv_shows(id) ON DELETE CASCADE,
  FOREIGN KEY (keyword_id) REFERENCES keywords(id) ON DELETE CASCADE,
  INDEX idx_tv_keywords_keyword (keyword_id)
);

-- Tabela SEARCH_HISTORY
CREATE TABLE search_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  query VARCHAR(255) NOT NULL,
  media_type ENUM('movie', 'tv', 'all') DEFAULT 'all',
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  result_count INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_search_history_timestamp (timestamp),
  INDEX idx_search_history_query (query)
);

-- Tabela USER_PREFERENCES
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY,
  favorite_keywords JSON,
  search_history JSON,
  watched_list JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## Notas Importantes

### Armazenamento de Dados

1. **TMDB Dados**: Vêm da API, não são armazenados localmente (leitura apenas)
2. **Metadata Local**: Apenas índices, keywords e preferências são armazenados localmente
3. **JSON Arrays**: Usados para genre_ids, origin_country (flexibilidade sem desnormalização)

### Performance

- Índices em campos de busca frequentes (popularity, vote_average, datas)
- Índices compostos para chaves estrangeiras
- Particionamento por data possível para search_history (crescimento indefinido)

### Escalabilidade Futura

- Considerar cache de Redis para keywords e genres
- Migrar search_history para NoSQL (MongoDB)
- Adicionar tabela de users se implementar autenticação
- Cache de resultados frequentes

### GDPR/Privacidade

- Considerar política de retenção de search_history (ex: deletar após 30 dias)
- Anonimizar dados de usuário se necessário
- Implementar GDPR compliance se coletar dados de usuário
