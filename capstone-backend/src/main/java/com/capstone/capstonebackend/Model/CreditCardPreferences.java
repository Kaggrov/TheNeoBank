package com.capstone.capstonebackend.Model;

import javax.persistence.*;

@Entity
@Table(name = "creditCardPreferences")
public class CreditCardPreferences {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "preference_id")
    private Long preferenceId;
    private boolean international;
    private boolean tap;

    private boolean block;

    public CreditCardPreferences() {
    }

    public CreditCardPreferences(Long preferenceId, boolean international, boolean tap, boolean block) {
        this.preferenceId = preferenceId;
        this.international = international;
        this.tap = tap;
        this.block = block;
    }

    public Long getPreferenceId() {
        return preferenceId;
    }

    public void setPreferenceId(Long preferenceId) {
        this.preferenceId = preferenceId;
    }

    public boolean isInternational() {
        return international;
    }

    public void setInternational(boolean international) {
        this.international = international;
    }

    public boolean isTap() {
        return tap;
    }

    public void setTap(boolean tap) {
        this.tap = tap;
    }

    public boolean isBlock() {
        return block;
    }

    public void setBlock(boolean block) {
        this.block = block;
    }

}
