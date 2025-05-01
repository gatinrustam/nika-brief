<?php

namespace models;

use myfrm\App;
use myfrm\Db;

class BriefModel
{
    protected $db;

    public function __construct()
    {
        $this->db = App::get(Db::class);
    }

    public function createBrief(array $data): bool
    {
        $sql = "INSERT INTO brief_submissions 
                (name, email, site_type, domain_choice, markdown, payload, created_at)
                VALUES (:name, :email, :site_type, :domain_choice, :markdown, :payload, :created_at)";

        $params = [
            'name' => $data['name'],
            'email' => $data['email'],
            'site_type' => $data['site_type'],
            'domain_choice' => $data['domain_choice'],
            'markdown' => $data['markdown'],
            'payload' => $data['payload'],
            'created_at' => $data['created_at'],
        ];

        $result = $this->db->query($sql, $params);
        return $result && $this->db->rowCount() > 0;
    }

    public function getBriefById(int $id)
    {
        $this->db->query("SELECT * FROM brief_submissions WHERE id = ?", [$id]);
        return $this->db->find();
    }

    public function getAllBriefsPaginated(int $start, int $perPage): array
    {
        $this->db->query("SELECT * FROM brief_submissions ORDER BY id DESC LIMIT $start, $perPage");
        return $this->db->findAll();
    }

    public function getBriefsCount(): int
    {
        $this->db->query("SELECT COUNT(*) FROM brief_submissions");
        return $this->db->getColumn();
    }

    public function deleteBrief(int $id): int
    {
        $this->db->query("DELETE FROM brief_submissions WHERE id = ?", [$id]);
        return $this->db->rowCount();
    }
}