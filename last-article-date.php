<?php
$dates = [];
foreach (glob(__DIR__ . '/clanky/*.md') as $articlePath) {
    $article = basename($articlePath);
    preg_match('~^(?<date>\d+-\d+-\d+)~', $article, $matches);
    $dates[] = DateTime::createFromFormat('Y-m-d', $matches['date']);
}
/** @var DateTime $lastDate */
$lastDate = max($dates);
$lastDate->setTime(0, 0, 0);
header('Content-Type: application/json');
header('Cache-Control: no-cache');
echo json_encode(['last_article_date' => max($dates)->format(DATE_ATOM)]);