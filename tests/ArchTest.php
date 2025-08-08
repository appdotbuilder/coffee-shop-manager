<?php

use Symfony\Component\Finder\Finder;

arch()->preset()->php()->ignoring(['dd', 'dump']);

arch()->preset()->laravel();
arch()->preset()->relaxed();
arch()->preset()->security()->ignoring(['array_rand', 'parse_str', 'mt_rand', 'uniqid', 'sha1']);

arch('annotations')
    ->expect('App')
    ->toUseStrictEquality()
    ->toHavePropertiesDocumented()
    ->toHaveMethodsDocumented();

// Test naming conventions
arch('feature tests use proper naming')
    ->expect('Tests\Feature')
    ->toHaveSuffix('Test');

arch('unit tests use proper naming')
    ->expect('Tests\Unit')
    ->toHaveSuffix('Test');
