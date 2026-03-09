import { X, Search, Clock } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useState } from 'react';

interface LogFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
const MEAL_TYPES: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

export function LogFoodModal({ isOpen, onClose }: LogFoodModalProps) {
  const { isDarkMode } = useTheme();
  const [mealType, setMealType] = useState<MealType>('breakfast');
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  const [fiber, setFiber] = useState('');

  const handleSubmit = () => {
    // Here you would typically save to state/database
    console.log('Food logged:', { mealType, foodName, calories, protein, carbs, fats, fiber });
    onClose();
    // Reset form
    setFoodName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFats('');
    setFiber('');
  };

  if (!isOpen) return null;

  const getMealButtonClassName = (meal: MealType, isSelected: boolean) => {
    switch (meal) {
      case 'breakfast':
        return isSelected
          ? 'border-orange-500/40 bg-orange-500/25 text-orange-300 shadow-[0_0_0_1px_rgba(249,115,22,0.15)]'
          : 'border-orange-500/20 bg-orange-500/10 text-orange-300 hover:bg-orange-500/18';
      case 'lunch':
        return isSelected
          ? 'border-cyan-500/40 bg-cyan-500/25 text-cyan-300 shadow-[0_0_0_1px_rgba(6,182,212,0.15)]'
          : 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/18';
      case 'dinner':
        return isSelected
          ? 'border-purple-500/40 bg-purple-500/25 text-purple-300 shadow-[0_0_0_1px_rgba(168,85,247,0.15)]'
          : 'border-purple-500/20 bg-purple-500/10 text-purple-300 hover:bg-purple-500/18';
      case 'snack':
        return isSelected
          ? 'border-green-500/40 bg-green-500/25 text-green-300 shadow-[0_0_0_1px_rgba(34,197,94,0.15)]'
          : 'border-green-500/20 bg-green-500/10 text-green-300 hover:bg-green-500/18';
      default:
        return isDarkMode
          ? 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
          : 'border-black/10 bg-black/5 text-black/60 hover:bg-black/10';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div 
        className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border smooth-transition ${
          isDarkMode 
            ? 'bg-[#0a0a0f]/95 border-white/10' 
            : 'bg-white/95 border-black/10'
        }`}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        {/* Header */}
        <div className={`sticky top-0 flex items-center justify-between p-6 border-b ${
          isDarkMode ? 'bg-[#0a0a0f]/95 border-white/10' : 'bg-white/95 border-black/10'
        }`}>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            Log Food Entry
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg smooth-transition ${
              isDarkMode
                ? 'bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 hover:text-rose-200 border border-rose-500/20'
                : 'bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 hover:text-rose-700 border border-rose-500/20'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Meal Type Selection */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Meal Type *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {MEAL_TYPES.map((meal) => (
                <button
                  key={meal}
                  onClick={() => setMealType(meal)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium smooth-transition border capitalize ${
                    getMealButtonClassName(meal, mealType === meal)
                  }`}
                >
                  {meal}
                </button>
              ))}
            </div>
          </div>

          {/* Food Name */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Food Name *
            </label>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
              <input
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="e.g., Grilled Chicken Salad"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border smooth-transition text-sm ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-green-400/50'
                    : 'bg-white/50 border-black/10 text-black/90 placeholder-black/40 focus:border-green-400/50'
                }`}
              />
            </div>
          </div>

          {/* Calories */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Calories *
            </label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="0"
              className={`w-full px-4 py-3 rounded-lg border smooth-transition text-sm ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-green-400/50'
                  : 'bg-white/50 border-black/10 text-black/90 placeholder-black/40 focus:border-green-400/50'
              }`}
            />
          </div>

          {/* Macronutrients Grid */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Macronutrients (grams)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className={`block text-xs mb-2 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                  Protein
                </label>
                <input
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  placeholder="0"
                  className={`w-full px-3 py-2 rounded-lg border smooth-transition text-sm ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-red-400/50'
                      : 'bg-white/50 border-black/10 text-black/90 placeholder-black/40 focus:border-red-400/50'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-xs mb-2 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                  Carbs
                </label>
                <input
                  type="number"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  placeholder="0"
                  className={`w-full px-3 py-2 rounded-lg border smooth-transition text-sm ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-orange-400/50'
                      : 'bg-white/50 border-black/10 text-black/90 placeholder-black/40 focus:border-orange-400/50'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-xs mb-2 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                  Fats
                </label>
                <input
                  type="number"
                  value={fats}
                  onChange={(e) => setFats(e.target.value)}
                  placeholder="0"
                  className={`w-full px-3 py-2 rounded-lg border smooth-transition text-sm ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-yellow-400/50'
                      : 'bg-white/50 border-black/10 text-black/90 placeholder-black/40 focus:border-yellow-400/50'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-xs mb-2 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                  Fiber
                </label>
                <input
                  type="number"
                  value={fiber}
                  onChange={(e) => setFiber(e.target.value)}
                  placeholder="0"
                  className={`w-full px-3 py-2 rounded-lg border smooth-transition text-sm ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-green-400/50'
                      : 'bg-white/50 border-black/10 text-black/90 placeholder-black/40 focus:border-green-400/50'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Time */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Time
            </label>
            <div className="relative">
              <Clock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
              <input
                type="text"
                value={new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                readOnly
                className={`w-full pl-10 pr-4 py-3 rounded-lg border smooth-transition text-sm ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-white/60'
                    : 'bg-white/50 border-black/10 text-black/60'
                }`}
              />
            </div>
          </div>

          {/* Quick Add Suggestions */}
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-500/10 border border-green-500/20'}`}>
            <p className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              💡 Tip: You can search our database of 500,000+ foods or scan barcodes in the full version!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={`sticky bottom-0 flex items-center justify-end gap-3 p-6 border-t ${
          isDarkMode ? 'bg-[#0a0a0f]/95 border-white/10' : 'bg-white/95 border-black/10'
        }`}>
          <button
            onClick={onClose}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium smooth-transition ${
              isDarkMode
                ? 'bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 border border-rose-500/20'
                : 'bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 border border-rose-500/20'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!foodName || !calories}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium smooth-transition border ${
              foodName && calories
                ? isDarkMode
                  ? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30'
                  : 'bg-green-500/20 text-green-600 border-green-500/30 hover:bg-green-500/30'
                : 'bg-white/5 text-white/30 border-white/10 cursor-not-allowed'
            }`}
          >
            Log Food
          </button>
        </div>
      </div>
    </div>
  );
}
