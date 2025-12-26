package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
)

func main() {
	if len(os.Args) < 2 {
		log.Fatal("Usage: go run scripts/create_migration.go create_users_table")
	}

	name := os.Args[1]

	// สร้าง directory ถ้ายังไม่มี
	if err := os.MkdirAll("migrations", 0755); err != nil {
		log.Fatal("Failed to create migrations directory:", err)
	}

	// หา version ล่าสุด
	version := getNextVersion()

	upFile := fmt.Sprintf("migrations/%06d_%s.up.sql", version, name)
	downFile := fmt.Sprintf("migrations/%06d_%s.down.sql", version, name)

	// สร้างไฟล์ .up.sql
	if err := os.WriteFile(upFile, []byte(upTemplate), 0644); err != nil {
		log.Fatal("Failed to create up file:", err)
	}

	// สร้างไฟล์ .down.sql
	if err := os.WriteFile(downFile, []byte(downTemplate), 0644); err != nil {
		log.Fatal("Failed to create down file:", err)
	}

	fmt.Printf("✓ Created migration files:\n")
	fmt.Printf("  - %s\n", upFile)
	fmt.Printf("  - %s\n", downFile)
}

func getNextVersion() int {
	files, err := filepath.Glob("migrations/*.up.sql")
	if err != nil || len(files) == 0 {
		return 1
	}
	return len(files) + 1
}

const upTemplate = `-- Write your up migration here
-- Example:
-- CREATE TABLE example (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255) NOT NULL
-- );
`

const downTemplate = `-- Write your down migration here
-- Example:
-- DROP TABLE IF EXISTS example;
`
