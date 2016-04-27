@extends('layouts.app')

@section('content')
    <div id="app-container"></div>
    <script></script>
@endsection

@section('js')
    @if (Auth::user()->isTeacher())
        <script src="{{ elixir('js/i-heart-reading-teacher.js') }}"></script>
    @else
        <script src="{{ elixir('js/i-heart-reading.js') }}"></script>
    @endif
@endsection
