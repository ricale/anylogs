const migrations = [

`CREATE TABLE writing (
    "id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "written_at" INTEGER,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    PRIMARY KEY("id" AUTOINCREMENT)
);`,

];

export default migrations;