CREATE EXTENSION vector;

CREATE TABLE documents (
    id bigserial PRIMARY KEY,
    embedding vector(768),
    user_id UUID
);

CREATE INDEX ON documents USING hnsw (embedding vector_l2_ops);

SET hnsw.ef_search = 100;

-- SET maintenance_work_mem = '8GB';

SET max_parallel_maintenance_workers = 7; -- plus leader