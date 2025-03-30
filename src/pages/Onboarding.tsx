
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Check, CreditCard, Wallet, Plus, Target, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Sample category data
const expenseCategories = [
  { id: 'food', name: 'Food & Dining', icon: '🍔', selected: true },
  { id: 'transport', name: 'Transportation', icon: '🚗', selected: true },
  { id: 'shopping', name: 'Shopping', icon: '🛍️', selected: true },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬', selected: true },
  { id: 'utilities', name: 'Utilities', icon: '💡', selected: true },
  { id: 'health', name: 'Healthcare', icon: '🏥', selected: true },
  { id: 'education', name: 'Education', icon: '📚', selected: false },
  { id: 'travel', name: 'Travel', icon: '✈️', selected: false },
  { id: 'housing', name: 'Housing', icon: '🏠', selected: false },
  { id: 'investment', name: 'Investments', icon: '📈', selected: false },
  { id: 'gifts', name: 'Gifts & Donations', icon: '🎁', selected: false },
  { id: 'beauty', name: 'Personal Care', icon: '💇', selected: false },
];

type OnboardingStep = 'welcome' | 'categories' | 'wallets' | 'budgets' | 'complete';

const Onboarding = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [categories, setCategories] = useState(expenseCategories);
  const [monthlyBudget, setMonthlyBudget] = useState(25000);
  
  const totalSteps = 5;
  const currentStepIndex = ['welcome', 'categories', 'wallets', 'budgets', 'complete'].indexOf(currentStep) + 1;
  const progressPercentage = (currentStepIndex / totalSteps) * 100;
  
  const handleCategoryToggle = (categoryId: string) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId 
          ? { ...category, selected: !category.selected } 
          : category
      )
    );
  };
  
  const handleNextStep = () => {
    const stepOrder: OnboardingStep[] = ['welcome', 'categories', 'wallets', 'budgets', 'complete'];
    const currentIndex = stepOrder.indexOf(currentStep);
    
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    } else {
      // Complete onboarding
      handleComplete();
    }
  };
  
  const handleComplete = () => {
    toast({
      title: "Onboarding Complete",
      description: "Your expense tracker is ready to use!"
    });
    
    navigate('/');
  };
  
  const handleSkip = () => {
    toast({
      title: "Skipped Setup",
      description: "You can always configure these settings later."
    });
    
    navigate('/');
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Welcome to UPI Expense Guardian</CardTitle>
              <CardDescription>
                Let's set up your expense tracker in a few simple steps
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              onClick={handleSkip}
              className="text-muted-foreground"
            >
              Skip Setup
            </Button>
          </div>
          <Progress value={progressPercentage} className="h-2 mt-4" />
        </CardHeader>
        
        <CardContent className="p-6">
          {currentStep === 'welcome' && (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Wallet className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Track Your UPI Expenses Effortlessly</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                UPI Expense Guardian helps you track, analyze, and optimize your spending habits with automatic categorization and insightful analytics.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                <div className="border rounded-lg p-4 text-center">
                  <div className="mx-auto w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">Track Transactions</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatic UPI transaction tracking and categorization
                  </p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <div className="mx-auto w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">Set Budgets</h3>
                  <p className="text-sm text-muted-foreground">
                    Create and track budgets for different spending categories
                  </p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <div className="mx-auto w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">Smart Insights</h3>
                  <p className="text-sm text-muted-foreground">
                    Get personalized insights to optimize your spending
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 'categories' && (
            <div className="py-4">
              <h2 className="text-xl font-semibold mb-6">Customize Your Expense Categories</h2>
              <p className="text-muted-foreground mb-6">
                Select the expense categories that are relevant to you. You can always add or remove them later.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      category.selected 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:bg-accent/50'
                    }`}
                    onClick={() => handleCategoryToggle(category.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-2xl">{category.icon}</div>
                      {category.selected && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="font-medium text-sm">
                      {category.name}
                    </div>
                  </div>
                ))}
                
                <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer">
                  <Plus className="h-6 w-6 mb-1" />
                  <span className="text-sm">Custom Category</span>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 'wallets' && (
            <div className="py-4">
              <h2 className="text-xl font-semibold mb-6">Connect Your UPI Wallets</h2>
              <p className="text-muted-foreground mb-6">
                Link your UPI accounts to automatically import transaction data. You can also add them later.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {[
                  { id: 'gpay', name: 'Google Pay', logo: '🟦', color: 'text-blue-500' },
                  { id: 'phonepe', name: 'PhonePe', logo: '🟪', color: 'text-purple-500' },
                  { id: 'paytm', name: 'Paytm', logo: '⬜', color: 'text-blue-400' },
                  { id: 'amazonpay', name: 'Amazon Pay', logo: '🟧', color: 'text-orange-500' },
                  { id: 'whatsapp', name: 'WhatsApp Pay', logo: '🟩', color: 'text-green-500' },
                ].map(provider => (
                  <div
                    key={provider.id}
                    className="border rounded-lg p-4 text-center cursor-pointer transition-all hover:shadow-md hover:bg-accent/50"
                  >
                    <div className="text-3xl mb-2">{provider.logo}</div>
                    <div className={`font-medium text-sm ${provider.color}`}>
                      {provider.name}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border rounded-md bg-amber-50 dark:bg-amber-900/20 text-muted-foreground">
                <p className="text-sm flex items-start">
                  <span className="mr-2">ℹ️</span>
                  UPI wallet integration is coming soon. For now, you can add transactions manually or import them via CSV.
                </p>
              </div>
            </div>
          )}
          
          {currentStep === 'budgets' && (
            <div className="py-4">
              <h2 className="text-xl font-semibold mb-6">Set Your Monthly Budget</h2>
              <p className="text-muted-foreground mb-6">
                Define your overall monthly budget. You can adjust category-specific budgets later.
              </p>
              
              <div className="max-w-md mx-auto">
                <Tabs defaultValue="overall" className="w-full mb-6">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="overall">Overall Budget</TabsTrigger>
                    <TabsTrigger value="categories">By Category</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overall">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Monthly Budget Amount (₹)</Label>
                        <span className="text-2xl font-bold">₹{monthlyBudget.toLocaleString()}</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        {[15000, 25000, 50000].map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant={monthlyBudget === amount ? "default" : "outline"}
                            onClick={() => setMonthlyBudget(amount)}
                            className="w-full"
                          >
                            ₹{amount.toLocaleString()}
                          </Button>
                        ))}
                      </div>
                      
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          const amount = prompt("Enter custom budget amount:", monthlyBudget.toString());
                          if (amount && !isNaN(Number(amount))) {
                            setMonthlyBudget(Number(amount));
                          }
                        }}
                      >
                        Custom Amount
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="categories">
                    <div className="text-center p-8">
                      <p className="text-muted-foreground mb-4">
                        Category-specific budgets can be configured in the Budgets section after setup.
                      </p>
                      <Button variant="outline" onClick={() => setCurrentStep('complete')}>
                        Skip to Finish
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
          
          {currentStep === 'complete' && (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <Check className="h-8 w-8 text-green-600 dark:text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Setup Complete!</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                You're all set to start tracking your expenses. You can always adjust your settings later.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                <div className="border rounded-lg p-4 text-center">
                  <div className="font-medium mb-1">Categories</div>
                  <p className="text-sm text-muted-foreground">
                    {categories.filter(c => c.selected).length} categories selected
                  </p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <div className="font-medium mb-1">Monthly Budget</div>
                  <p className="text-sm text-muted-foreground">
                    ₹{monthlyBudget.toLocaleString()}
                  </p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <div className="font-medium mb-1">Wallet Integration</div>
                  <p className="text-sm text-muted-foreground">
                    Coming soon
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => {
              if (currentStep !== 'welcome') {
                const stepOrder: OnboardingStep[] = ['welcome', 'categories', 'wallets', 'budgets', 'complete'];
                const currentIndex = stepOrder.indexOf(currentStep);
                setCurrentStep(stepOrder[currentIndex - 1]);
              }
            }}
            disabled={currentStep === 'welcome'}
          >
            Back
          </Button>
          
          <Button 
            onClick={currentStep === 'complete' ? handleComplete : handleNextStep}
            className="gap-1"
          >
            {currentStep === 'complete' ? 'Get Started' : 'Continue'}
            <ArrowRight size={16} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Onboarding;
