import { Apple, Plus, Droplet, TrendingUp, ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useState } from 'react';
import { LogFoodModal } from './LogFoodModal';

interface FoodEntry {
  id: number;
  name: string;
  time: string;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  sugar: number;
}

type NutritionView = 'overview' | 'journal' | 'water';
const NUTRITION_VIEWS: NutritionView[] = ['overview', 'journal', 'water'];

export function Nutrition() {
  const { isDarkMode } = useTheme();
  const [activeView, setActiveView] = useState<NutritionView>('overview');
  const [sortField, setSortField] = useState<keyof FoodEntry>('time');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const macros = [
    { name: 'Protein', current: 85, goal: 120, unit: 'g', color: 'bg-red-500', gradient: 'from-red-500 to-pink-500' },
    { name: 'Carbs', current: 180, goal: 250, unit: 'g', color: 'bg-orange-500', gradient: 'from-orange-500 to-yellow-500' },
    { name: 'Fats', current: 45, goal: 65, unit: 'g', color: 'bg-yellow-500', gradient: 'from-yellow-500 to-amber-500' },
    { name: 'Fiber', current: 22, goal: 30, unit: 'g', color: 'bg-green-500', gradient: 'from-green-500 to-emerald-500' },
  ];

  const foodEntries: FoodEntry[] = [
    { id: 1, name: 'Oatmeal with Berries', time: '7:30 AM', meal: 'breakfast', calories: 320, protein: 12, carbs: 54, fats: 8, fiber: 8, sugar: 12 },
    { id: 2, name: 'Greek Yogurt', time: '7:45 AM', meal: 'breakfast', calories: 150, protein: 15, carbs: 12, fats: 4, fiber: 0, sugar: 8 },
    { id: 3, name: 'Banana', time: '10:00 AM', meal: 'snack', calories: 105, protein: 1, carbs: 27, fats: 0, fiber: 3, sugar: 14 },
    { id: 4, name: 'Grilled Chicken Salad', time: '12:30 PM', meal: 'lunch', calories: 420, protein: 35, carbs: 28, fats: 18, fiber: 6, sugar: 5 },
    { id: 5, name: 'Almonds', time: '3:00 PM', meal: 'snack', calories: 160, protein: 6, carbs: 6, fats: 14, fiber: 3, sugar: 1 },
    { id: 6, name: 'Salmon with Quinoa', time: '6:45 PM', meal: 'dinner', calories: 520, protein: 38, carbs: 42, fats: 22, fiber: 5, sugar: 3 },
    { id: 7, name: 'Steamed Broccoli', time: '7:00 PM', meal: 'dinner', calories: 55, protein: 4, carbs: 11, fats: 1, fiber: 4, sugar: 2 },
  ];

  const waterIntake = [
    { hour: '6 AM', amount: 250 },
    { hour: '8 AM', amount: 500 },
    { hour: '10 AM', amount: 350 },
    { hour: '12 PM', amount: 400 },
    { hour: '2 PM', amount: 300 },
    { hour: '4 PM', amount: 450 },
    { hour: '6 PM', amount: 350 },
    { hour: '8 PM', amount: 200 },
  ];

  const totalWater = waterIntake.reduce((sum, entry) => sum + entry.amount, 0);
  const waterGoal = 2500; // ml

  const weeklyCalories = [
    { day: 'Mon', calories: 2100, goal: 2200 },
    { day: 'Tue', calories: 2350, goal: 2200 },
    { day: 'Wed', calories: 1980, goal: 2200 },
    { day: 'Thu', calories: 2280, goal: 2200 },
    { day: 'Fri', calories: 2150, goal: 2200 },
    { day: 'Sat', calories: 2400, goal: 2200 },
    { day: 'Sun', calories: 1850, goal: 2200 },
  ];

  const mealBreakdown = [
    { meal: 'Breakfast', calories: 470, percentage: 25 },
    { meal: 'Lunch', calories: 420, percentage: 23 },
    { meal: 'Dinner', calories: 575, percentage: 31 },
    { meal: 'Snacks', calories: 385, percentage: 21 },
  ];

  const handleSort = (field: keyof FoodEntry) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedEntries = [...foodEntries]
    .filter(entry => entry.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

  const SortIcon = ({ field }: { field: keyof FoodEntry }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;
  };

  const getMealColor = (meal: string) => {
    switch (meal) {
      case 'breakfast': return 'bg-orange-500/20 text-orange-400';
      case 'lunch': return 'bg-cyan-500/20 text-cyan-400';
      case 'dinner': return 'bg-purple-500/20 text-purple-400';
      case 'snack': return 'bg-green-500/20 text-green-400';
      default: return 'bg-white/10 text-white/60';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold m-0 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Nutrition
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Track your daily nutrition and meals
          </p>
        </div>
        <button
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg smooth-transition ${
            isDarkMode
              ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
              : 'bg-green-500/20 text-green-600 hover:bg-green-500/30 border border-green-500/30'
          }`}
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Log Food</span>
        </button>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2">
        {NUTRITION_VIEWS.map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`px-4 py-2 rounded-lg smooth-transition text-sm font-medium capitalize ${
              activeView === view
                ? isDarkMode
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-green-500/20 text-green-600 border border-green-500/30'
                : isDarkMode
                ? 'bg-white/5 text-white/60 hover:bg-white/10'
                : 'bg-black/5 text-black/60 hover:bg-black/10'
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeView === 'overview' && (
        <>
          {/* Calorie Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                Today's Calories
              </h2>
              <div className="text-center mb-6">
                <div className={`text-5xl font-bold mb-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                  1,850
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                  of 2,200 calories
                </p>
                <div className={`h-3 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} overflow-hidden mt-4`}>
                  <div className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full" style={{ width: '84%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className={isDarkMode ? 'text-white/60' : 'text-black/60'}>Remaining</span>
                  <span className="text-green-400 font-semibold">350 cal</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={isDarkMode ? 'text-white/60' : 'text-black/60'}>Burned</span>
                  <span className="text-orange-400 font-semibold">-520 cal</span>
                </div>
              </div>
            </div>

            {/* Meal Breakdown */}
            <div className="glass-card p-6">
              <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                Meal Breakdown
              </h2>
              <div className="space-y-3">
                {mealBreakdown.map((meal) => (
                  <div key={meal.meal}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>{meal.meal}</span>
                      <span className={`text-sm font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                        {meal.calories} cal ({meal.percentage}%)
                      </span>
                    </div>
                    <div className={`h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} overflow-hidden`}>
                      <div 
                        className={`h-full ${getMealColor(meal.meal.toLowerCase())} rounded-full`}
                        style={{ width: `${meal.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass-card p-6">
              <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                Quick Stats
              </h2>
              <div className="space-y-4">
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Meals Logged</span>
                    <span className={`text-lg font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>7</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Water Intake</span>
                    <span className={`text-lg font-bold text-cyan-400`}>{(totalWater / 1000).toFixed(1)}L</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Avg Daily</span>
                    <span className={`text-lg font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>2,147</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Macronutrients */}
          <div className="glass-card p-6">
            <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Macronutrients
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {macros.map((macro) => {
                const percentage = (macro.current / macro.goal) * 100;
                return (
                  <div key={macro.name}>
                    <div className="text-center mb-3">
                      <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                        {macro.current}<span className="text-sm">{macro.unit}</span>
                      </div>
                      <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                        of {macro.goal}{macro.unit}
                      </p>
                    </div>
                    <div className={`h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} overflow-hidden mb-2`}>
                      <div 
                        className={`h-full bg-gradient-to-r ${macro.gradient} rounded-full smooth-transition`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    <p className={`text-xs text-center font-medium ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                      {macro.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Calorie Trend */}
          <div className="glass-card p-6">
            <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Weekly Calorie Trend
            </h2>
            <div className="flex items-end justify-between gap-3 h-64">
              {weeklyCalories.map((day, index) => {
                const maxCalories = Math.max(...weeklyCalories.map(d => Math.max(d.calories, d.goal)));
                const calorieHeight = (day.calories / maxCalories) * 100;
                const goalHeight = (day.goal / maxCalories) * 100;

                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex gap-1 items-end relative" style={{ height: '200px' }}>
                      {/* Goal line */}
                      <div 
                        className="absolute left-0 right-0 border-t-2 border-dashed border-yellow-400/30"
                        style={{ bottom: `${goalHeight}%` }}
                      />
                      {/* Actual calories */}
                      <div
                        className={`flex-1 rounded-t smooth-transition ${
                          day.calories > day.goal 
                            ? 'bg-orange-500/30 border-t-2 border-orange-400' 
                            : 'bg-green-500/30 border-t-2 border-green-400'
                        } hover:opacity-80 cursor-pointer`}
                        style={{ height: `${calorieHeight}%` }}
                        title={`${day.calories} cal`}
                      />
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{day.day}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-400"></div>
                <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>At or Below Goal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-orange-400"></div>
                <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Over Goal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-dashed border-yellow-400/50"></div>
                <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Goal Line</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Food Journal Tab */}
      {activeView === 'journal' && (
        <>
          {/* Search & Filter */}
          <div className="glass-card p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
                <input
                  type="text"
                  placeholder="Search food entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border smooth-transition text-sm ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-green-400/50'
                      : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-green-400/50'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Food Entries Table */}
          <div className="glass-card p-6 overflow-x-auto">
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Today's Food Journal
            </h2>
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                  <th 
                    className={`text-left py-3 px-4 text-xs font-semibold cursor-pointer hover:bg-white/5 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}
                    onClick={() => handleSort('time')}
                  >
                    <div className="flex items-center gap-1">
                      Time
                      <SortIcon field="time" />
                    </div>
                  </th>
                  <th 
                    className={`text-left py-3 px-4 text-xs font-semibold cursor-pointer hover:bg-white/5 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      Food
                      <SortIcon field="name" />
                    </div>
                  </th>
                  <th 
                    className={`text-left py-3 px-4 text-xs font-semibold cursor-pointer hover:bg-white/5 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}
                    onClick={() => handleSort('meal')}
                  >
                    <div className="flex items-center gap-1">
                      Meal
                      <SortIcon field="meal" />
                    </div>
                  </th>
                  <th 
                    className={`text-right py-3 px-4 text-xs font-semibold cursor-pointer hover:bg-white/5 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}
                    onClick={() => handleSort('calories')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Calories
                      <SortIcon field="calories" />
                    </div>
                  </th>
                  <th 
                    className={`text-right py-3 px-4 text-xs font-semibold cursor-pointer hover:bg-white/5 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}
                    onClick={() => handleSort('protein')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Protein
                      <SortIcon field="protein" />
                    </div>
                  </th>
                  <th 
                    className={`text-right py-3 px-4 text-xs font-semibold cursor-pointer hover:bg-white/5 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}
                    onClick={() => handleSort('carbs')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Carbs
                      <SortIcon field="carbs" />
                    </div>
                  </th>
                  <th 
                    className={`text-right py-3 px-4 text-xs font-semibold cursor-pointer hover:bg-white/5 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}
                    onClick={() => handleSort('fats')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Fats
                      <SortIcon field="fats" />
                    </div>
                  </th>
                  <th 
                    className={`text-right py-3 px-4 text-xs font-semibold cursor-pointer hover:bg-white/5 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}
                    onClick={() => handleSort('fiber')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Fiber
                      <SortIcon field="fiber" />
                    </div>
                  </th>
                  <th 
                    className={`text-right py-3 px-4 text-xs font-semibold cursor-pointer hover:bg-white/5 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}
                    onClick={() => handleSort('sugar')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Sugar
                      <SortIcon field="sugar" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedEntries.map((entry) => (
                  <tr 
                    key={entry.id}
                    className={`border-b smooth-transition ${
                      isDarkMode 
                        ? 'border-white/5 hover:bg-white/5' 
                        : 'border-black/5 hover:bg-black/5'
                    }`}
                  >
                    <td className={`py-3 px-4 text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                      {entry.time}
                    </td>
                    <td className={`py-3 px-4 text-sm font-medium ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                      {entry.name}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded capitalize ${getMealColor(entry.meal)}`}>
                        {entry.meal}
                      </span>
                    </td>
                    <td className={`py-3 px-4 text-sm text-right font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                      {entry.calories}
                    </td>
                    <td className={`py-3 px-4 text-sm text-right text-red-400`}>
                      {entry.protein}g
                    </td>
                    <td className={`py-3 px-4 text-sm text-right text-orange-400`}>
                      {entry.carbs}g
                    </td>
                    <td className={`py-3 px-4 text-sm text-right text-yellow-400`}>
                      {entry.fats}g
                    </td>
                    <td className={`py-3 px-4 text-sm text-right text-green-400`}>
                      {entry.fiber}g
                    </td>
                    <td className={`py-3 px-4 text-sm text-right text-pink-400`}>
                      {entry.sugar}g
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className={`border-t-2 font-semibold ${isDarkMode ? 'border-white/20' : 'border-black/20'}`}>
                  <td colSpan={3} className={`py-3 px-4 text-sm ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                    TOTALS
                  </td>
                  <td className={`py-3 px-4 text-sm text-right ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                    {sortedEntries.reduce((sum, e) => sum + e.calories, 0)}
                  </td>
                  <td className={`py-3 px-4 text-sm text-right text-red-400`}>
                    {sortedEntries.reduce((sum, e) => sum + e.protein, 0)}g
                  </td>
                  <td className={`py-3 px-4 text-sm text-right text-orange-400`}>
                    {sortedEntries.reduce((sum, e) => sum + e.carbs, 0)}g
                  </td>
                  <td className={`py-3 px-4 text-sm text-right text-yellow-400`}>
                    {sortedEntries.reduce((sum, e) => sum + e.fats, 0)}g
                  </td>
                  <td className={`py-3 px-4 text-sm text-right text-green-400`}>
                    {sortedEntries.reduce((sum, e) => sum + e.fiber, 0)}g
                  </td>
                  <td className={`py-3 px-4 text-sm text-right text-pink-400`}>
                    {sortedEntries.reduce((sum, e) => sum + e.sugar, 0)}g
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      )}

      {/* Water Intake Tab */}
      {activeView === 'water' && (
        <>
          {/* Water Summary */}
          <div className="glass-card p-6">
            <div className="text-center mb-6">
              <Droplet className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                Today's Water Intake
              </h2>
              <div className={`text-5xl font-bold mb-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                {(totalWater / 1000).toFixed(1)} <span className="text-2xl">L</span>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                of {(waterGoal / 1000).toFixed(1)}L goal
              </p>
              <div className={`h-4 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} overflow-hidden mt-4 max-w-md mx-auto`}>
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full smooth-transition"
                  style={{ width: `${(totalWater / waterGoal) * 100}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                <div className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>8</div>
                <div className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Glasses</div>
              </div>
              <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                <div className={`text-2xl font-bold mb-1 text-cyan-400`}>{totalWater}ml</div>
                <div className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Total</div>
              </div>
              <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                <div className={`text-2xl font-bold mb-1 text-green-400`}>{waterGoal - totalWater}ml</div>
                <div className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Remaining</div>
              </div>
              <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                <div className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                  {Math.round((totalWater / waterGoal) * 100)}%
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Complete</div>
              </div>
            </div>
          </div>

          {/* Hourly Water Intake Chart */}
          <div className="glass-card p-6">
            <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Hourly Water Intake
            </h2>
            <div className="flex items-end justify-between gap-3 h-64">
              {waterIntake.map((entry, index) => {
                const maxAmount = Math.max(...waterIntake.map(e => e.amount));
                const height = (entry.amount / maxAmount) * 100;

                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end" style={{ height: '200px' }}>
                      <div
                        className="w-full bg-gradient-to-t from-cyan-500/50 to-blue-500/50 border-t-2 border-cyan-400 rounded-t smooth-transition hover:opacity-80 cursor-pointer relative group"
                        style={{ height: `${height}%` }}
                      >
                        {/* Tooltip */}
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 smooth-transition ${
                          isDarkMode ? 'bg-black/80 text-white' : 'bg-white/80 text-black'
                        }`}>
                          {entry.amount}ml
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{entry.hour}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Add Buttons */}
          <div className="glass-card p-6">
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Quick Add
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[250, 350, 500, 750].map((amount) => (
                <button
                  key={amount}
                  className={`p-4 rounded-lg smooth-transition border ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 hover:bg-cyan-500/20 hover:border-cyan-400'
                      : 'bg-black/5 border-black/10 hover:bg-cyan-500/20 hover:border-cyan-400'
                  }`}
                >
                  <Droplet className={`w-6 h-6 mx-auto mb-2 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                  <div className={`text-sm font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                    {amount}ml
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Log Food Modal */}
      <LogFoodModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
