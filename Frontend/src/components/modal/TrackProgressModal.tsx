import React from "react";

function TrackProgressModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [weight, setWeight] = React.useState('');
    const [notes, setNotes] = React.useState('');
    const [selectedMetric, setSelectedMetric] = React.useState('weight');
    const [progressPhoto, setProgressPhoto] = React.useState<File | null>(null);

    if (!open) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProgressPhoto(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle form submission
        alert('Progress saved successfully!');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold text-gray-800">Track Your Progress</h3>
                        <button 
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <div className="flex space-x-2 mb-4">
                                {['weight', 'measurements', 'photo'].map((metric) => (
                                    <button
                                        key={metric}
                                        type="button"
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                            selectedMetric === metric
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                        onClick={() => setSelectedMetric(metric)}
                                    >
                                        {metric.charAt(0).toUpperCase() + metric.slice(1)}
                                    </button>
                                ))}
                            </div>

                            {selectedMetric === 'weight' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Weight (kg)
                                        </label>
                                        <input
                                            type="number"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            placeholder="Enter your current weight"
                                            step="0.1"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {selectedMetric === 'measurements' && (
                                <div className="grid grid-cols-2 gap-4">
                                    {['Chest', 'Waist', 'Hips', 'Arms'].map((area) => (
                                        <div key={area}>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {area} (cm)
                                            </label>
                                            <input
                                                type="number"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder={`${area} measurement`}
                                                step="0.1"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedMetric === 'photo' && (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <input
                                        type="file"
                                        id="progress-photo"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="progress-photo"
                                        className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-sm text-gray-600">
                                            {progressPhoto 
                                                ? `Selected: ${progressPhoto.name}`
                                                : 'Click to upload progress photo'}
                                        </p>
                                        <span className="text-xs text-gray-500">PNG, JPG up to 5MB</span>
                                    </label>
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Notes
                            </label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                rows={3}
                                placeholder="Any additional notes about your progress..."
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Save Progress
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TrackProgressModal;