<?php

namespace App\Applications\Outcomes;

use App\Http\Requests\Outcomes\AddOutcomeRequest;
use App\Models\Outcome;
use Illuminate\Support\Facades\DB;

class OutcomeApplication
{
    public function addOutcome(AddOutcomeRequest $request)
    {
        $outcome = new Outcome();
        $outcome->name = $request->validated()['name'];
        $outcome->fee = $request->validated()['fee'];
        $outcome->save();
        return $outcome;
    }

    public function getIndex()
    {
        $data = DB::table('outcomes AS outcome')->orderBy('outcome.created_at', 'DESC')->get();
        return $data;
    }
}
