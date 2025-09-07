import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { HardDrive, AlertTriangle, CheckCircle, Play, Shield, Clock } from "lucide-react";
import { toast } from "sonner";

interface WipeOperationProps {
  onWipeStart: () => void;
  onWipeComplete: () => void;
}

export const WipeOperation = ({ onWipeStart, onWipeComplete }: WipeOperationProps) => {
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isWiping, setIsWiping] = useState(false);
  const [wipeProgress, setWipeProgress] = useState(0);
  const [wipePhase, setWipePhase] = useState("");

  const handleStartWipe = async () => {
    if (!selectedDevice || !selectedMethod) {
      toast.error("Please select a device and wipe method");
      return;
    }

    setIsWiping(true);
    onWipeStart();
    
    const phases = [
      { name: "Initializing secure wipe...", duration: 1000 },
      { name: "Scanning device sectors...", duration: 2000 },
      { name: "Applying NIST SP 800-88 protocol...", duration: 3000 },
      { name: "Overwriting data patterns...", duration: 4000 },
      { name: "Verifying wipe completion...", duration: 2000 },
      { name: "Generating digital certificate...", duration: 1500 }
    ];

    let currentProgress = 0;
    for (const phase of phases) {
      setWipePhase(phase.name);
      const increment = 100 / phases.length;
      
      await new Promise(resolve => {
        const interval = setInterval(() => {
          currentProgress += increment / (phase.duration / 100);
          setWipeProgress(Math.min(currentProgress, (phases.indexOf(phase) + 1) * increment));
        }, 100);
        
        setTimeout(() => {
          clearInterval(interval);
          resolve(void 0);
        }, phase.duration);
      });
    }

    setWipeProgress(100);
    setWipePhase("Wipe completed successfully");
    setIsWiping(false);
    onWipeComplete();
    
    toast.success("Secure wipe completed successfully! Certificate generated.");
    
    // Reset after a delay
    setTimeout(() => {
      setWipeProgress(0);
      setWipePhase("");
    }, 3000);
  };

  const wipeethods = [
    { value: "nist-sp-800-88", label: "NIST SP 800-88 (Recommended)", description: "Single overwrite with random data" },
    { value: "dod-5220", label: "DoD 5220.22-M", description: "Three-pass overwrite pattern" },
    { value: "gutmann", label: "Gutmann (35-pass)", description: "Maximum security for legacy drives" },
    { value: "crypto-erase", label: "Cryptographic Erase", description: "Fast SSD-optimized method" }
  ];

  const devices = [
    { value: "ssd-samsung-980", label: "Samsung SSD 980 (500GB)", type: "SSD", status: "ready" },
    { value: "hdd-seagate-2tb", label: "Seagate BarraCuda (2TB)", type: "HDD", status: "ready" },
    { value: "usb-sandisk-64gb", label: "SanDisk USB Drive (64GB)", type: "USB", status: "ready" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-primary" />
              Select Device
            </CardTitle>
            <CardDescription>
              Choose the storage device you want to securely wipe
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedDevice} onValueChange={setSelectedDevice} disabled={isWiping}>
              <SelectTrigger>
                <SelectValue placeholder="Select a device to wipe" />
              </SelectTrigger>
              <SelectContent>
                {devices.map((device) => (
                  <SelectItem key={device.value} value={device.value}>
                    <div className="flex items-center justify-between w-full">
                      <span>{device.label}</span>
                      <Badge variant="outline" className="ml-2">
                        {device.type}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedDevice && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Warning:</strong> This operation will permanently destroy all data on the selected device. 
                  This action cannot be undone.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Wipe Method Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Wipe Method
            </CardTitle>
            <CardDescription>
              Choose the security standard for data destruction
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedMethod} onValueChange={setSelectedMethod} disabled={isWiping}>
              <SelectTrigger>
                <SelectValue placeholder="Select wipe method" />
              </SelectTrigger>
              <SelectContent>
                {wipeethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    <div className="space-y-1">
                      <div className="font-medium">{method.label}</div>
                      <div className="text-sm text-muted-foreground">{method.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedMethod === "nist-sp-800-88" && (
              <Alert>
                <CheckCircle className="h-4 w-4 text-success" />
                <AlertDescription>
                  NIST SP 800-88 is the recommended standard for most use cases, providing excellent security 
                  with optimal performance.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Wipe Progress */}
      {(isWiping || wipeProgress > 0) && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isWiping ? (
                <Clock className="h-5 w-5 text-warning animate-spin" />
              ) : (
                <CheckCircle className="h-5 w-5 text-success" />
              )}
              Secure Wipe Progress
            </CardTitle>
            <CardDescription>{wipePhase}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={wipeProgress} className="h-3" />
            <div className="text-sm text-muted-foreground">
              {Math.round(wipeProgress)}% complete
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleStartWipe}
          disabled={!selectedDevice || !selectedMethod || isWiping}
          size="lg"
          className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
        >
          {isWiping ? (
            <>
              <Clock className="mr-2 h-5 w-5 animate-spin" />
              Wiping in Progress...
            </>
          ) : (
            <>
              <Play className="mr-2 h-5 w-5" />
              Start Secure Wipe
            </>
          )}
        </Button>
      </div>
    </div>
  );
};