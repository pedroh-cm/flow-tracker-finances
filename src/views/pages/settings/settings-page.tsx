"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { toast } from "sonner";

import { useAuthStore } from "@/src/viewmodels/stores/auth-store";
import { useThemeStore } from "@/src/viewmodels/stores/theme-store";
import { Button } from "@/src/views/components/ui/button";
import { Input } from "@/src/views/components/ui/form";
import { Label } from "@/src/views/components/ui/form";
import { ProfilePictureUpload } from "@/src/views/components/settings/profile-picture-upload";

export function SettingsPage() {
  const { user, profile, updateProfile } = useAuthStore();
  const { theme, hasHydrated, toggleTheme } = useThemeStore();
  const [phone, setPhone] = useState(profile?.phone || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      // Simular delay de save
      await new Promise((resolve) => setTimeout(resolve, 500));
      updateProfile({ phone });
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar perfil");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Configurações</h1>
        <p className="text-sm text-muted-foreground">Gerencie seu perfil e preferências</p>
      </div>

      <div className="animate-fade-in space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-4">
          {profile?.profileImageUrl ? (
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.profileImageUrl}
                alt="Profile"
                className="h-16 w-16 rounded-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-xl font-bold text-primary-foreground">
              {user?.name?.slice(0, 2).toUpperCase() || "FT"}
            </div>
          )}
          <div>
            <p className="font-semibold text-card-foreground">{user?.name || "Usuário"}</p>
            <p className="text-sm text-muted-foreground">{user?.email || ""}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Foto de Perfil</Label>
            <ProfilePictureUpload
              currentImage={profile?.profileImageUrl}
              onImageChange={(base64) => updateProfile({ profileImageUrl: base64 })}
            />
          </div>

          <div>
            <Label>Nome completo</Label>
            <Input defaultValue={user?.name || ""} disabled className="bg-muted" />
          </div>
          <div>
            <Label>E-mail</Label>
            <Input defaultValue={user?.email || ""} type="email" disabled className="bg-muted" />
          </div>
          <div>
            <Label>Telefone</Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(11) 99999-9999"
              type="tel"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancelar</Button>
          <Button
            onClick={handleSaveProfile}
            disabled={isSaving}
            className="bg-gradient-primary text-primary-foreground hover:opacity-90"
          >
            {isSaving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </div>

      <div className="animate-fade-in rounded-2xl border border-border bg-card p-6 shadow-sm" style={{ animationDelay: "0.1s" }}>
        <h2 className="mb-4 font-display text-base font-semibold text-foreground">Aparência</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-card-foreground">Tema</p>
            <p className="text-xs text-muted-foreground">
              {hasHydrated && (theme === "dark" ? "Modo escuro ativado" : "Modo claro ativado")}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={toggleTheme} className="gap-2">
            {hasHydrated && (theme === "dark" ? <Sun size={16} /> : <Moon size={16} />)}
            {hasHydrated && (theme === "dark" ? "Modo Claro" : "Modo Escuro")}
          </Button>
        </div>
      </div>
    </div>
  );
}
