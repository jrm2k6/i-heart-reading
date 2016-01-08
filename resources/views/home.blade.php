@extends('layouts.app')

@section('content')
    <div id="student-app-container"></div>
    <script></script>
@endsection

@section('js')
    <script src="{{ elixir('js/student-app.js') }}"></script>
@endsection
