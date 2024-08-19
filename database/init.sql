CREATE EXTENSION vector;

CREATE TABLE documents (
    id bigserial PRIMARY KEY,
    user_id UUID,
    title TEXT
);

CREATE TABLE embeddings (
    id bigserial PRIMARY KEY,
    embedding vector(768),
    document_id bigint REFERENCES documents(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX ON embeddings USING hnsw (embedding vector_l2_ops);

SET hnsw.ef_search = 100;

-- SET maintenance_work_mem = '8GB';

SET max_parallel_maintenance_workers = 7; -- plus leader