import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Home, Building, MapPin, Plus, Edit, Trash2 } from "lucide-react";
import { useGetMyAddress } from "@/services/profile";
import { AddressForm } from "./components/addressForm";

export default function AddressesPage() {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<null | number>(null);

  const handleEditAddress = (e: React.FormEvent) => {
    // e.preventDefault();
    // setIsSubmitting(true);
    // // Simulate API call
    // setTimeout(() => {
    //   setIsSubmitting(false);
    //   setEditingAddress(null);
    //   toast({
    //     title: "Address updated",
    //     description: "Your address has been updated successfully.",
    //   });
    // }, 1500);
  };

  const handleDeleteAddress = (id: number) => {
    // if (confirm("Are you sure you want to delete this address?")) {
    //   setAddresses(addresses.filter((address) => address.id !== id));
    //   toast({
    //     title: "Address deleted",
    //     description: "Your address has been deleted successfully.",
    //   });
    // }
  };

  const handleSetDefault = (id: number) => {
    // setAddresses(
    //   addresses.map((address) => ({
    //     ...address,
    //     isDefault: address.id === id,
    //   }))
    // );
    // toast({
    //   title: "Default address updated",
    //   description: "Your default address has been updated successfully.",
    // });
  };

  const { data: addresses } = useGetMyAddress();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">收货地址</h1>
          <p className="text-muted-foreground">管理你的常用收货地址</p>
        </div>
        <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
          <DialogTrigger asChild>
            <Button className=" cursor-pointer">
              <Plus className="h-4 w-4 mr-2" />
              添加新地址
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <AddressForm
              isAddingAddress={isAddingAddress}
              setIsAddingAddress={setIsAddingAddress}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses?.map((address) => (
          <div></div>
          //   <Card key={address.id} className="relative">
          //     <CardHeader className="pb-2">
          //       <div className="flex items-center justify-between">
          //         <div className="flex items-center gap-2">
          //           {address.type === "home" ? (
          //             <Home className="h-4 w-4 text-muted-foreground" />
          //           ) : (
          //             <Building className="h-4 w-4 text-muted-foreground" />
          //           )}
          //           <CardTitle className="text-lg capitalize">
          //             {address.type}
          //           </CardTitle>
          //           {address.isDefault && (
          //             <Badge variant="outline">Default</Badge>
          //           )}
          //         </div>
          //         <div className="flex items-center gap-1">
          //           <Dialog>
          //             <DialogTrigger asChild>
          //               <Button
          //                 variant="ghost"
          //                 size="icon"
          //                 onClick={() => setEditingAddress(address.id)}
          //               >
          //                 <Edit className="h-4 w-4" />
          //                 <span className="sr-only">Edit</span>
          //               </Button>
          //             </DialogTrigger>
          //             <DialogContent className="sm:max-w-[500px]">
          //               <form onSubmit={handleEditAddress}>
          //                 <DialogHeader>
          //                   <DialogTitle>Edit Address</DialogTitle>
          //                   <DialogDescription>
          //                     Update your address information.
          //                   </DialogDescription>
          //                 </DialogHeader>
          //                 <div className="grid gap-4 py-4">
          //                   <div className="grid grid-cols-2 gap-4">
          //                     <div className="space-y-2">
          //                       <Label htmlFor="edit-address-type">
          //                         Address Type
          //                       </Label>
          //                       <select
          //                         id="edit-address-type"
          //                         className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          //                         defaultValue={address.type}
          //                       >
          //                         <option value="home">Home</option>
          //                         <option value="work">Work</option>
          //                         <option value="other">Other</option>
          //                       </select>
          //                     </div>
          //                     <div className="space-y-2">
          //                       <Label htmlFor="edit-full-name">Full Name</Label>
          //                       <Input
          //                         id="edit-full-name"
          //                         defaultValue={address.name}
          //                       />
          //                     </div>
          //                   </div>
          //                   <div className="space-y-2">
          //                     <Label htmlFor="edit-street-address">
          //                       Street Address
          //                     </Label>
          //                     <Input
          //                       id="edit-street-address"
          //                       defaultValue={address.street}
          //                     />
          //                   </div>
          //                   <div className="space-y-2">
          //                     <Label htmlFor="edit-apt">
          //                       Apartment, Suite, etc. (optional)
          //                     </Label>
          //                     <Input id="edit-apt" defaultValue={address.apt} />
          //                   </div>
          //                   <div className="grid grid-cols-2 gap-4">
          //                     <div className="space-y-2">
          //                       <Label htmlFor="edit-city">City</Label>
          //                       <Input
          //                         id="edit-city"
          //                         defaultValue={address.city}
          //                       />
          //                     </div>
          //                     <div className="space-y-2">
          //                       <Label htmlFor="edit-state">State/Province</Label>
          //                       <Input
          //                         id="edit-state"
          //                         defaultValue={address.state}
          //                       />
          //                     </div>
          //                   </div>
          //                   <div className="grid grid-cols-2 gap-4">
          //                     <div className="space-y-2">
          //                       <Label htmlFor="edit-zip">ZIP/Postal Code</Label>
          //                       <Input id="edit-zip" defaultValue={address.zip} />
          //                     </div>
          //                     <div className="space-y-2">
          //                       <Label htmlFor="edit-country">Country</Label>
          //                       <select
          //                         id="edit-country"
          //                         className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          //                         defaultValue={
          //                           address.country === "United States"
          //                             ? "US"
          //                             : address.country
          //                         }
          //                       >
          //                         <option value="US">United States</option>
          //                         <option value="CA">Canada</option>
          //                         <option value="UK">United Kingdom</option>
          //                         <option value="AU">Australia</option>
          //                       </select>
          //                     </div>
          //                   </div>
          //                   <div className="space-y-2">
          //                     <Label htmlFor="edit-phone">Phone Number</Label>
          //                     <Input
          //                       id="edit-phone"
          //                       defaultValue={address.phone}
          //                     />
          //                   </div>
          //                   <div className="flex items-center space-x-2">
          //                     <input
          //                       type="checkbox"
          //                       id="edit-default-address"
          //                       className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          //                       defaultChecked={address.isDefault}
          //                     />
          //                     <Label
          //                       htmlFor="edit-default-address"
          //                       className="text-sm font-normal"
          //                     >
          //                       Set as default address
          //                     </Label>
          //                   </div>
          //                 </div>
          //                 <DialogFooter>
          //                   <Button
          //                     type="button"
          //                     variant="outline"
          //                     onClick={() => setEditingAddress(null)}
          //                   >
          //                     Cancel
          //                   </Button>
          //                   <Button type="submit" disabled={isSubmitting}>
          //                     {isSubmitting ? "Saving..." : "Save Changes"}
          //                   </Button>
          //                 </DialogFooter>
          //               </form>
          //             </DialogContent>
          //           </Dialog>
          //           <Button
          //             variant="ghost"
          //             size="icon"
          //             onClick={() => handleDeleteAddress(address.id)}
          //             disabled={address.isDefault}
          //           >
          //             <Trash2 className="h-4 w-4" />
          //             <span className="sr-only">Delete</span>
          //           </Button>
          //         </div>
          //       </div>
          //     </CardHeader>
          //     <CardContent>
          //       <div className="space-y-1 text-sm">
          //         <p className="font-medium">{address.name}</p>
          //         <p>{address.street}</p>
          //         {address.apt && <p>{address.apt}</p>}
          //         <p>
          //           {address.city}, {address.state} {address.zip}
          //         </p>
          //         <p>{address.country}</p>
          //         <p>{address.phone}</p>
          //       </div>
          //     </CardContent>
          //     <CardFooter className="flex justify-between pt-0">
          //       {!address.isDefault ? (
          //         <Button
          //           variant="outline"
          //           size="sm"
          //           onClick={() => handleSetDefault(address.id)}
          //         >
          //           Set as Default
          //         </Button>
          //       ) : (
          //         <div></div>
          //       )}
          //       <Button variant="outline" size="sm">
          //         <MapPin className="h-4 w-4 mr-2" />
          //         View on Map
          //       </Button>
          //     </CardFooter>
          //   </Card>
        ))}
      </div>
    </div>
  );
}
