<?php

namespace App\Http\Controllers;

use App\Models\Caregiver;
use Illuminate\Http\Request;

class CaregiverController extends Controller
{
    public function index()
    {
        return Caregiver::with('patients')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'specialty' => 'required|string',
            'phone' => 'required|string',
            'patient_ids' => 'array',
        ]);

        $caregiver = Caregiver::create($data);

        if (!empty($data['patient_ids'])) {
            $caregiver->patients()->sync($data['patient_ids']);
        }

        return response()->json($caregiver->load('patients'), 201);
    }

    public function show($id)
    {
        return Caregiver::with('patients')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $caregiver = Caregiver::findOrFail($id);

        $data = $request->validate([
            'name' => 'string',
            'specialty' => 'string',
            'phone' => 'string',
            'patient_ids' => 'array',
        ]);

        $caregiver->update($data);

        if (isset($data['patient_ids'])) {
            $caregiver->patients()->sync($data['patient_ids']);
        }

        return response()->json($caregiver->load('patients'));
    }

    public function destroy($id)
    {
        $caregiver = Caregiver::findOrFail($id);
        $caregiver->patients()->detach();
        $caregiver->delete();

        return response()->json(['message' => 'Cuidador excluído com sucesso']);
    }
}
